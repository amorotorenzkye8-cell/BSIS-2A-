// ===============================
// SUBJECT TAB SWITCHING
// ===============================
document.addEventListener("DOMContentLoaded", function () {

    const buttons = document.querySelectorAll(".subject-btn");
    const contents = document.querySelectorAll(".subject-content");

    // TAB SWITCHING
    buttons.forEach(button => {
        button.addEventListener("click", () => {

            // Remove active from all
            buttons.forEach(btn => btn.classList.remove("active"));
            contents.forEach(content => content.classList.remove("active"));

            // Add active to clicked button
            button.classList.add("active");

            const target = button.getAttribute("data-subject");
            const targetContent = document.getElementById(target);

            if (targetContent) {
                targetContent.classList.add("active");
            }

            // Remove notification badge when opened
            const badge = button.querySelector(".notif-badge");
            if (badge) {
                badge.style.display = "none";
                localStorage.setItem(target + "_seen", "true"); // store as seen
            }

        });
    });

    // ===============================
    // POST TIME FORMATTING
    // ===============================
    const postTimes = document.querySelectorAll(".post-time");

    postTimes.forEach(time => {
        const storedDate = time.getAttribute("data-date");
        if (!storedDate) return;

        const date = new Date(storedDate);

        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        };

        const formattedDate = date.toLocaleString("en-US", options);

        time.innerText = "Posted on: " + formattedDate;
    });

    // ===============================
    // SIMPLE NEW NOTIFICATION BADGE
    // ===============================
    buttons.forEach(button => {
        const target = button.getAttribute("data-subject");
        const seen = localStorage.getItem(target + "_seen");

        if (!seen) {
            const badge = document.createElement("span");
            badge.classList.add("notif-badge");
            badge.innerText = "NEW";
            button.appendChild(badge);
        }
    });

});


// ===============================
// OFFLINE / ONLINE DETECTION
// ===============================
const offlineScreen = document.getElementById("offline-screen");

function updateOnlineStatus() {
    if (!offlineScreen) return;

    if (navigator.onLine) {
        offlineScreen.classList.add("hidden");
    } else {
        offlineScreen.classList.remove("hidden");
    }
}

// Check on page load
window.addEventListener("load", updateOnlineStatus);

// Listen for internet changes
window.addEventListener("online", updateOnlineStatus);
window.addEventListener("offline", updateOnlineStatus);