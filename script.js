// =====================================================
// GIET SMARTSHELF
// LOGIN / REGISTER / OTP SYSTEM
// =====================================================


// =====================================================
// CURRENT ROLES
// =====================================================

let loginRole = "student";

let registerRole = "student";

let forgotRole = "student";


// =====================================================
// OTP VARIABLES
// =====================================================

let generatedOTP = "";

let otpVerified = false;


// =====================================================
// OPEN LOGIN
// =====================================================

function openLogin() {

    closeModal();

    document.getElementById("loginModal").style.display = "flex";

}


// =====================================================
// OPEN REGISTER
// =====================================================

function openRegister() {

    closeModal();

    document.getElementById("registerModal").style.display = "flex";

}


// =====================================================
// OPEN FORGOT PASSWORD
// =====================================================

function openForgot() {

    closeModal();

    document.getElementById("forgotModal").style.display = "flex";

}


// =====================================================
// CLOSE MODALS
// =====================================================

function closeModal() {

    document.getElementById("loginModal").style.display = "none";

    document.getElementById("registerModal").style.display = "none";

    document.getElementById("forgotModal").style.display = "none";

}


// =====================================================
// CLOSE WHEN CLICKING OUTSIDE
// =====================================================

window.onclick = function(event) {

    if (event.target.classList.contains("modal")) {

        closeModal();

    }

};


// =====================================================
// LOGIN ROLE
// =====================================================

function selectLoginRole(role) {

    loginRole = role;


    document
        .querySelectorAll("#loginModal .role-tab")
        .forEach(button => {

            button.classList.remove("active");

        });


    if (role === "student") {

        document
            .getElementById("studentLoginTab")
            .classList.add("active");


        document
            .getElementById("loginIdLabel")
            .textContent = "Student PIN";


        document
            .getElementById("loginId")
            .placeholder =
            "Enter your student PIN";

    }


    if (role === "teacher") {

        document
            .getElementById("teacherLoginTab")
            .classList.add("active");


        document
            .getElementById("loginIdLabel")
            .textContent = "Teacher ID";


        document
            .getElementById("loginId")
            .placeholder =
            "Enter your teacher ID";

    }


    if (role === "admin") {

        document
            .getElementById("adminLoginTab")
            .classList.add("active");


        document
            .getElementById("loginIdLabel")
            .textContent = "Admin ID";


        document
            .getElementById("loginId")
            .placeholder =
            "Enter your admin ID";

    }

}


// =====================================================
// REGISTER ROLE
// =====================================================

function selectRegisterRole(role) {

    registerRole = role;


    document
        .querySelectorAll("#registerModal .role-tab")
        .forEach(button => {

            button.classList.remove("active");

        });


    document
        .getElementById(role + "RegisterTab")
        .classList.add("active");


    const studentFields =
        document.getElementById("studentFields");


    const teacherFields =
        document.getElementById("teacherFields");


    const adminFields =
        document.getElementById("adminFields");


    studentFields.classList.add("hidden");

    teacherFields.classList.add("hidden");

    adminFields.classList.add("hidden");


    if (role === "student") {

        studentFields.classList.remove("hidden");


        document
            .getElementById("registerIdLabel")
            .textContent = "Student PIN";


        document
            .getElementById("registerId")
            .placeholder =
            "Enter student PIN";

    }


    if (role === "teacher") {

        teacherFields.classList.remove("hidden");


        document
            .getElementById("registerIdLabel")
            .textContent = "Teacher ID";


        document
            .getElementById("registerId")
            .placeholder =
            "Enter teacher ID";

    }


    if (role === "admin") {

        adminFields.classList.remove("hidden");


        document
            .getElementById("registerIdLabel")
            .textContent = "Admin ID";


        document
            .getElementById("registerId")
            .placeholder =
            "Enter admin ID";

    }

}


// =====================================================
// SEND OTP
// =====================================================

function sendOTP() {

    const phone =
        document
            .getElementById("registerPhone")
            .value
            .trim();


    // Check 10 digit phone

    if (!/^[0-9]{10}$/.test(phone)) {

        alert(
            "❌ Please enter a valid 10-digit phone number."
        );

        return;

    }


    // Generate 6 digit OTP

    generatedOTP =
        Math.floor(
            100000 +
            Math.random() * 900000
        ).toString();


    otpVerified = false;


    // Show OTP section

    document
        .getElementById("otpSection")
        .classList.remove("hidden");


    document
        .getElementById("registerOTP")
        .value = "";


    const status =
        document.getElementById("otpStatus");


    status.textContent =
        "Demo OTP: " + generatedOTP;


    status.className =
        "otp-status";


    alert(
        "📱 Demo OTP:\n\n" +
        generatedOTP +
        "\n\nUse this OTP to verify your phone."
    );

}


// =====================================================
// VERIFY OTP
// =====================================================

function verifyOTP() {

    const enteredOTP =
        document
            .getElementById("registerOTP")
            .value
            .trim();


    if (enteredOTP === "") {

        alert(
            "❌ Please enter the OTP."
        );

        return;

    }


    if (enteredOTP === generatedOTP) {

        otpVerified = true;


        const status =
            document.getElementById("otpStatus");


        status.textContent =
            "✓ Phone number verified successfully.";


        status.className =
            "otp-status otp-success";


        alert(
            "✅ Phone number verified!"
        );

    }

    else {

        otpVerified = false;


        const status =
            document.getElementById("otpStatus");


        status.textContent =
            "❌ Invalid OTP. Please try again.";


        status.className =
            "otp-status otp-error";

    }

}


// =====================================================
// REGISTER ACCOUNT
// =====================================================

function register(event) {

    event.preventDefault();


    // OTP must be verified

    if (!otpVerified) {

        alert(
            "❌ Please verify your phone number with OTP before registering."
        );

        return;

    }


    const name =
        document
            .getElementById("registerName")
            .value
            .trim();


    const id =
        document
            .getElementById("registerId")
            .value
            .trim();


    const phone =
        document
            .getElementById("registerPhone")
            .value
            .trim();


    const email =
        document
            .getElementById("registerEmail")
            .value
            .trim();


    const password =
        document
            .getElementById("registerPassword")
            .value;


    const confirmPassword =
        document
            .getElementById("confirmPassword")
            .value;


    // Password check

    if (password !== confirmPassword) {

        alert(
            "❌ Passwords do not match."
        );

        return;

    }


    // Create account object

    let account = {

        role: registerRole,

        name: name,

        id: id,

        phone: phone,

        email: email,

        password: password

    };


    // Student information

    if (registerRole === "student") {

        account.branch =
            document
                .getElementById("branch")
                .value;


        account.year =
            document
                .getElementById("year")
                .value;

    }


    // Teacher information

    if (registerRole === "teacher") {

        account.department =
            document
                .getElementById("teacherDepartment")
                .value;


        account.designation =
            document
                .getElementById("designation")
                .value;

    }


    // Admin information

    if (registerRole === "admin") {

        account.department =
            document
                .getElementById("adminDepartment")
                .value;

    }


    // Get existing accounts

    let accounts =
        JSON.parse(
            localStorage.getItem(
                "gietSmartShelfAccounts"
            )
        ) || [];


    // Check duplicate ID

    const exists =
        accounts.some(

            user =>

                user.role === registerRole &&

                user.id === id

        );


    if (exists) {

        alert(
            "❌ This ID is already registered."
        );

        return;

    }


    // Save account

    accounts.push(account);


    localStorage.setItem(

        "gietSmartShelfAccounts",

        JSON.stringify(accounts)

    );


    alert(

        "✅ " +
        registerRole.toUpperCase() +
        " account created successfully!"

    );


    closeModal();


    openLogin();


    // Select same login role

    selectLoginRole(registerRole);

}


// =====================================================
// LOGIN
// =====================================================

function login(event) {

    event.preventDefault();


    const id =
        document
            .getElementById("loginId")
            .value
            .trim();


    const password =
        document
            .getElementById("loginPassword")
            .value;


    // Get accounts

    const accounts =
        JSON.parse(
            localStorage.getItem(
                "gietSmartShelfAccounts"
            )
        ) || [];


    // Find user

    const user =
        accounts.find(

            account =>

                account.role === loginRole &&

                account.id === id &&

                account.password === password

        );


    if (!user) {

        alert(

            "❌ Invalid " +
            loginRole +
            " ID or password."

        );

        return;

    }


    alert(

        "✅ Login successful!\n\n" +
        "Welcome " +
        user.name

    );


    closeModal();


    // =================================================
    // DASHBOARD CONNECTION
    // =================================================

    if (loginRole === "student") {

        // Later:
        // window.location.href =
        // "student-dashboard.html";

        console.log(
            "Student Dashboard"
        );

    }


    if (loginRole === "teacher") {

        // Later:
        // window.location.href =
        // "teacher-dashboard.html";

        console.log(
            "Teacher Dashboard"
        );

    }


    if (loginRole === "admin") {

        // Later:
        // window.location.href =
        // "admin-dashboard.html";

        console.log(
            "Admin Dashboard"
        );

    }

}


// =====================================================
// FORGOT PASSWORD ROLE
// =====================================================

function selectForgotRole(role) {

    forgotRole = role;


    document
        .querySelectorAll("#forgotModal .role-tab")
        .forEach(button => {

            button.classList.remove("active");

        });


    document
        .getElementById(
            role + "ForgotTab"
        )
        .classList.add("active");


    const label =
        document.getElementById(
            "forgotIdLabel"
        );


    const input =
        document.getElementById(
            "forgotId"
        );


    if (role === "student") {

        label.textContent =
            "Student PIN";


        input.placeholder =
            "Enter your student PIN";

    }


    if (role === "teacher") {

        label.textContent =
            "Teacher ID";


        input.placeholder =
            "Enter your teacher ID";

    }


    if (role === "admin") {

        label.textContent =
            "Admin ID";


        input.placeholder =
            "Enter your admin ID";

    }

}


// =====================================================
// FORGOT PASSWORD
// =====================================================

function forgotPassword(event) {

    event.preventDefault();


    const id =
        document
            .getElementById("forgotId")
            .value
            .trim();


    const phone =
        document
            .getElementById("forgotPhone")
            .value
            .trim();


    const accounts =
        JSON.parse(
            localStorage.getItem(
                "gietSmartShelfAccounts"
            )
        ) || [];


    const user =
        accounts.find(

            account =>

                account.role === forgotRole &&

                account.id === id &&

                account.phone === phone

        );


    if (!user) {

        alert(
            "❌ Account details not found."
        );

        return;

    }


    alert(

        "✅ Account verified.\n\n" +

        "Password reset is ready to be connected " +

        "with OTP/email verification."

    );

}
