/* =========================================
   GIET SMARTSHELF
   STUDENT DASHBOARD
========================================= */


/* ================= STUDENT DATA ================= */

let student =
    JSON.parse(
        localStorage.getItem("gietStudent")
    )
    ||
    {
        name: "Student",
        pin: "CME001",
        branch: "CME",
        year: "3rd Year",
        phone: "9876543210",
        password: "123456"
    };


/* ================= BOOK DATA ================= */

let books =
    JSON.parse(
        localStorage.getItem("studentBooks")
    )
    ||
    [];


/* ================= LOAD STUDENT ================= */

function loadStudent() {

    document.getElementById("sideStudentName")
        .textContent = student.name;

    document.getElementById("sideStudentPin")
        .textContent =
        "PIN: " + student.pin;

    document.getElementById("welcomeText")
        .textContent =
        "Welcome, " + student.name + " 👋";


    document.getElementById("profileName")
        .textContent = student.name;

    document.getElementById("profilePin")
        .textContent = student.pin;

    document.getElementById("profileBranch")
        .textContent = student.branch;

    document.getElementById("profileYear")
        .textContent = student.year;

    document.getElementById("profilePhone")
        .textContent = student.phone;
}


/* ================= OPEN SECTION ================= */

function openSection(sectionId, button) {

    const sections =
        document.querySelectorAll(
            ".content-section"
        );


    sections.forEach(function(section) {

        section.classList.remove("active");

    });


    document.getElementById(sectionId)
        .classList.add("active");


    const buttons =
        document.querySelectorAll(
            ".menu-btn"
        );


    buttons.forEach(function(btn) {

        btn.classList.remove("active");

    });


    if (button) {

        button.classList.add("active");

    }


    updateDashboard();
}


/* ================= CAMERA ================= */

let cameraStream = null;


async function openCamera() {

    try {

        cameraStream =
            await navigator.mediaDevices.getUserMedia({
                video: true
            });


        document.getElementById("camera")
            .srcObject = cameraStream;

    }

    catch (error) {

        alert(
            "Camera permission is required."
        );

    }
}


/* ================= CAPTURE ================= */

function captureBook() {

    const video =
        document.getElementById("camera");

    const canvas =
        document.getElementById("canvas");

    const image =
        document.getElementById(
            "capturedImage"
        );


    if (!video.srcObject) {

        alert(
            "First click Open Camera."
        );

        return;
    }


    canvas.width =
        video.videoWidth;

    canvas.height =
        video.videoHeight;


    const context =
        canvas.getContext("2d");


    context.drawImage(
        video,
        0,
        0,
        canvas.width,
        canvas.height
    );


    image.src =
        canvas.toDataURL("image/png");


    image.style.display =
        "block";


    alert(
        "Book image captured successfully! 📸"
    );
}


/* ================= ADD BOOK ================= */

document
    .getElementById("bookForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const bookName =
                document.getElementById(
                    "bookName"
                ).value.trim();


            const takingDate =
                document.getElementById(
                    "takingDate"
                ).value;


            const returnDate =
                document.getElementById(
                    "returnDate"
                ).value;


            const capturedImage =
                document.getElementById(
                    "capturedImage"
                ).src;


            if (
                !bookName ||
                !takingDate ||
                !returnDate
            ) {

                alert(
                    "Please enter all details."
                );

                return;
            }


            if (returnDate < takingDate) {

                alert(
                    "Return date cannot be before taking date."
                );

                return;
            }


            const newBook = {

                id: Date.now(),

                bookName:
                    bookName,

                takingDate:
                    takingDate,

                returnDate:
                    returnDate,

                status:
                    "Taken",

                image:
                    capturedImage || "",

                studentPin:
                    student.pin

            };


            books.push(newBook);


            localStorage.setItem(
                "studentBooks",
                JSON.stringify(books)
            );


            alert(
                "Book added successfully! 📚"
            );


            document
                .getElementById("bookForm")
                .reset();


            document
                .getElementById("capturedImage")
                .style.display = "none";


            updateDashboard();


            openSection(
                "myBooks",
                document.querySelectorAll(
                    ".menu-btn"
                )[1]
            );

        }
    );


/* ================= DISPLAY BOOKS ================= */

function displayBooks() {

    const table =
        document.getElementById(
            "booksTable"
        );


    table.innerHTML = "";


    if (books.length === 0) {

        table.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    style="text-align:center">

                    No books found.

                </td>

            </tr>

        `;

    }


    books.forEach(function(book) {

        let statusClass;


        if (book.status === "Taken") {

            statusClass =
                "status-taken";

        }

        else {

            statusClass =
                "status-returned";

        }


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${book.bookName}
            </td>

            <td>
                ${formatDate(book.takingDate)}
            </td>

            <td>
                ${formatDate(book.returnDate)}
            </td>

            <td>

                <span
                    class="status ${statusClass}">

                    ${book.status}

                </span>

            </td>

            <td>

                ${
                    book.status === "Taken"

                    ?

                    `
                    <button
                        class="return-btn"
                        onclick="returnBook(${book.id})">

                        Return

                    </button>
                    `

                    :

                    "—"
                }

            </td>

        `;


        table.appendChild(row);

    });


    document.getElementById("takenCount")
        .textContent =
        books.filter(
            b => b.status === "Taken"
        ).length;


    document.getElementById("returnedCount")
        .textContent =
        books.filter(
            b => b.status === "Returned"
        ).length;
}


/* ================= RETURN BOOK ================= */

function returnBook(id) {

    const book =
        books.find(
            b => b.id === id
        );


    if (!book) return;


    const confirmation =
        confirm(
            "Are you sure you want to return this book?"
        );


    if (!confirmation) return;


    book.status =
        "Returned";


    localStorage.setItem(
        "studentBooks",
        JSON.stringify(books)
    );


    alert(
        "Book returned successfully! ✅"
    );


    updateDashboard();
}


/* ================= DUE DATE ================= */

function displayDueDates() {

    const container =
        document.getElementById(
            "dueList"
        );


    container.innerHTML = "";


    const activeBooks =
        books.filter(
            book =>
                book.status === "Taken"
        );


    if (activeBooks.length === 0) {

        container.innerHTML = `

            <div class="due-item">

                <h3>
                    📚 No Active Books
                </h3>

                <p>
                    You currently have no books to return.
                </p>

            </div>

        `;

        return;
    }


    const today =
        new Date();


    today.setHours(
        0, 0, 0, 0
    );


    activeBooks.forEach(
        function(book) {

            const returnDate =
                new Date(
                    book.returnDate
                );


            returnDate.setHours(
                0, 0, 0, 0
            );


            const difference =
                returnDate - today;


            const daysRemaining =
                Math.ceil(
                    difference /
                    (1000 * 60 * 60 * 24)
                );


            let status;
            let statusClass;


            if (daysRemaining < 0) {

                status =
                    "OVERDUE";

                statusClass =
                    "status-overdue";

            }

            else if (daysRemaining === 0) {

                status =
                    "DUE TODAY";

                statusClass =
                    "status-overdue";

            }

            else {

                status =
                    daysRemaining +
                    " day(s) remaining";

                statusClass =
                    "status-taken";
            }


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "due-item";


            item.innerHTML = `

                <h3>
                    📖 ${book.bookName}
                </h3>

                <p>
                    Return Date:
                    <strong>
                        ${formatDate(book.returnDate)}
                    </strong>
                </p>

                <p>
                    Days Remaining:
                    <strong>
                        ${
                            daysRemaining < 0
                            ? 0
                            : daysRemaining
                        }
                    </strong>
                </p>

                <span
                    class="status ${statusClass}">

                    ${status}

                </span>

            `;


            container.appendChild(item);

        }
    );

}


/* ================= CHANGE PASSWORD ================= */

function changePassword() {

    const oldPassword =
        document.getElementById(
            "oldPassword"
        ).value;


    const newPassword =
        document.getElementById(
            "newPassword"
        ).value;


    if (!oldPassword || !newPassword) {

        alert(
            "Please enter both passwords."
        );

        return;
    }


    if (
        oldPassword !==
        student.password
    ) {

        alert(
            "Current password is incorrect."
        );

        return;
    }


    if (newPassword.length < 6) {

        alert(
            "Password must contain at least 6 characters."
        );

        return;
    }


    student.password =
        newPassword;


    localStorage.setItem(
        "gietStudent",
        JSON.stringify(student)
    );


    document.getElementById(
        "oldPassword"
    ).value = "";


    document.getElementById(
        "newPassword"
    ).value = "";


    alert(
        "Password changed successfully! 🔐"
    );
}


/* ================= UPDATE PHONE ================= */

function updatePhone() {

    const phone =
        document.getElementById(
            "newPhone"
        ).value.trim();


    if (
        !/^[0-9]{10}$/.test(phone)
    ) {

        alert(
            "Enter a valid 10-digit phone number."
        );

        return;
    }


    student.phone =
        phone;


    localStorage.setItem(
        "gietStudent",
        JSON.stringify(student)
    );


    document.getElementById(
        "profilePhone"
    ).textContent =
        phone;


    document.getElementById(
        "newPhone"
    ).value = "";


    alert(
        "Phone number updated successfully! 📱"
    );
}


/* ================= LOGOUT ================= */

function logout() {

    const confirmation =
        confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmation) {

        return;
    }


    /*
       Remove student login session
    */

    localStorage.removeItem(
        "studentLoggedIn"
    );


    /*
       Stop camera if running
    */

    if (cameraStream) {

        cameraStream
            .getTracks()
            .forEach(
                track =>
                    track.stop()
            );

    }


    /*
       Go back to login page
    */

    window.location.href =
        "index.html";
}


/* ================= DATE FORMAT ================= */

function formatDate(dateString) {

    if (!dateString) {

        return "—";

    }


    const date =
        new Date(dateString);


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
}


/* ================= UPDATE ================= */

function updateDashboard() {

    displayBooks();

    displayDueDates();

}


/* ================= START ================= */

loadStudent();

updateDashboard();
