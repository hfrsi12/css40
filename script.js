
















var user = {
    balance: 0.00,
    activatedPlans: {} // No plans activated initially

};

console.log("Hello, World!");


function updateBalanceDisplay() {
    document.getElementById('user-balance').textContent = user.balance.toFixed(2) + ' $';
}




































function showNotification(plan, price, dailyProfit) {
    // Check if the user has enough balance to activate the plan
    if (user.balance >= price) {
        var notification = document.getElementById('notification');
        notification.style.display = 'block';
        document.getElementById('notification-message').textContent = 'هل تريد تفعيل خطة ' + plan + ' بقيمة $' + price + '؟';

        document.getElementById('confirm-button').onclick = function() {
            // Deduct the plan price from user's balance and activate the plan
            user.balance -= price;
            alert('تم تفعيل الخطة. المتبقي في رصيدك: $' + user.balance.toFixed(2));

            user.activatedPlans[plan] = {
                price: price,
                dailyProfit: dailyProfit,
                activatedAt: Date.now()
            };

            var button = document.querySelector('#' + plan.toLowerCase() + ' button');
            button.disabled = true;
            button.textContent = 'تم التفعيل';
            document.getElementById('lock-' + plan.toLowerCase()).style.display = 'none';

            // Activate notification for daily profit after 24 hours
            setTimeout(function() {
                alert('انتهت فترة 24 ساعة. سيتم إضافة الربح اليومي: $' + dailyProfit);
                user.balance += dailyProfit;
                alert('تمت إضافة الربح اليومي. الرصيد الحالي: $' + user.balance.toFixed(2));
            }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds
            hideNotification();
        };
    } else {
        alert('عذرًا، رصيدك الحالي غير كافٍ لتفعيل هذه الخطة. يرجى إيداع المزيد من الأموال للمتابعة.');
        // Optionally, you can provide a link or button to redirect users to deposit funds.
    }
}

function hideNotification() {
    var notification = document.getElementById('notification');
    notification.style.display = 'none';
}

// Example function to deposit funds (to be triggered by a deposit button or link)
function depositFunds(amount) {
    user.balance += amount;
    alert('تم إيداع المبلغ بنجاح. الرصيد الحالي: $' + user.balance.toFixed(2));
}





// مثال بسيط: تحديث نص بالنقر على زر
function myFunction() {
    document.getElementById("demo").innerHTML = "تم تحديث النص باستخدام JavaScript!";
}









function requestWithdrawal(amount) {
    if (!currentUser) {
        alert('يجب عليك تسجيل الدخول لطلب السحب.');
        return;
    }

    // قم بإرسال طلب السحب إلى المسؤول للتأكيد
    var confirmation = confirm('هل أنت متأكد أنك تريد طلب سحب مبلغ $' + amount + '؟');

    if (confirmation) {
        // يمكنك هنا إرسال طلب السحب إلى المسؤول أو تنفيذ الخطوات اللازمة للسحب
        alert('تم إرسال طلب السحب. يرجى انتظار تأكيد المسؤول.');
        
        // يمكنك إضافة المزيد من الخطوات هنا، مثل تحديث حالة المستخدم وغيرها
    } else {
        alert('تم إلغاء طلب السحب.');
    }
}
window.onload = function() {
    var loginSection = document.getElementById('login-section');
    var balanceElement = document.getElementById('user-balance'); // عنصر عرض الرصيد

    // تحديث عرض الرصيد
    function updateBalanceDisplay() {
        if (currentUser && users[currentUser]) {
            balanceElement.textContent = user.balance.toFixed(2); // تحديث النص بقيمة الرصيد
        } else {
            balanceElement.textContent = '0.00'; // إعادة تعيين الرصيد إلى القيمة الافتراضية
        }
    }

    // تسجيل الدخول
    document.getElementById('login-button').onclick = function() {
        var username = document.getElementById('username').value;
        loginUser(username);
        if (currentUser) {
            loginSection.style.display = 'none';
            document.getElementById('main-content').style.display = 'block';
            updateBalanceDisplay(); // تحديث عرض الرصيد بعد تسجيل الدخول
        }
    };

    // التسجيل الجديد
    document.getElementById('register-button').onclick = function() {
        var username = document.getElementById('username').value;
        registerUser(username);
        if (currentUser) {
            loginSection.style.display = 'none';
            document.getElementById('main-content').style.display = 'block';
            updateBalanceDisplay(); // تحديث عرض الرصيد بعد التسجيل الجديد
        }
    };

    // تسجيل الخروج
    document.getElementById('logout-button').onclick = function() {
        logoutUser();
        location.reload();
    };

    // إظهار الأقسام المناسبة بعد تحميل الصفحة
    if (currentUser) {
        loginSection.style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        updateBalanceDisplay(); // تحديث عرض الرصيد بعد تحميل الصفحة
        updatePlanButtons(); // تحديث أزرار الخطط المفعلة
    }
};



var currentUser = localStorage.getItem('currentUser');
var users = JSON.parse(localStorage.getItem('users')) || {};

if (currentUser && users[currentUser]) {
    var user = users[currentUser];
} else {
    var user = {
        balance: 0.00,
        activatedPlans: {},
        pendingDeposits: []
    };
}

function saveUserState() {
    users[currentUser] = user;
    localStorage.setItem('users', JSON.stringify(users));
    updateBalanceDisplay();
}

function registerUser(username) {
    if (users[username]) {
        alert('اسم المستخدم موجود بالفعل.');
        return;
    }
    currentUser = username;
    user = {
        balance: 0.00,
        activatedPlans: {},
        pendingDeposits: []
    };
    users[currentUser] = user;
    localStorage.setItem('currentUser', currentUser);
    saveUserState();
    alert('تم التسجيل بنجاح!');
    updateBalanceDisplay();
}

function loginUser(username) {
    if (!users[username]) {
        alert('اسم المستخدم غير موجود.');
        return;
    }
    currentUser = username;
    user = users[currentUser];
    localStorage.setItem('currentUser', currentUser);
    alert('تم تسجيل الدخول بنجاح!');
    updatePlanButtons();
    updateBalanceDisplay();
}

function logoutUser() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    alert('تم تسجيل الخروج بنجاح!');
    updateBalanceDisplay();
}

function showNotification(plan, price, dailyProfit) {
    if (!currentUser) {
        alert('يجب عليك تسجيل الدخول لتفعيل خطة.');
        return;
    }

    if (user.activatedPlans[plan]) {
        alert('تم تفعيل هذه الخطة بالفعل.');
        return;
    }

    var notification = document.getElementById('notification');
    notification.style.display = 'block';
    document.getElementById('notification-message').textContent = 'هل تريد تفعيل خطة ' + plan + ' بقيمة $' + price + '؟';

    document.getElementById('confirm-button').onclick = function() {
        if (user.balance >= price) {
            user.balance -= price;
            alert('تم تفعيل الخطة. المتبقي في رصيدك: $' + user.balance.toFixed(2));
            updateBalanceDisplay();

            var activationDate = new Date();
            var expirationDate = new Date();
            expirationDate.setDate(activationDate.getDate() + 30);

            user.activatedPlans[plan] = {
                price: price,
                dailyProfit: dailyProfit,
                activatedAt: activationDate.getTime(),
                expiresAt: expirationDate.getTime()
            };

            saveUserState();

            updatePlanButtons();

            setTimeout(function() {
                alert('انتهت فترة 24 ساعة. سيتم إضافة الربح اليومي: $' + dailyProfit);
                user.balance += dailyProfit;
                alert('تمت إضافة الربح اليومي. الرصيد الحالي: $' + user.balance.toFixed(2));
                saveUserState();
                updateBalanceDisplay();
            }, 24 * 60 * 60 * 1000);
        } else {
            alert('عذرًا، رصيدك الحالي غير كافٍ لتفعيل هذه الخطة. يرجى إيداع المزيد من الأموال للمتابعة.');
        }
        hideNotification();
    };
}

function hideNotification() {
    var notification = document.getElementById('notification');
    notification.style.display = 'none';
}

function depositFunds(amount, trc20Address) {
    if (!currentUser) {
        alert('يجب عليك تسجيل الدخول لإيداع الأموال.');
        return;
    }

    user.pendingDeposits.push({
        amount: amount,
        trc20Address: trc20Address,
        confirmed: false
    });

    alert('تم تقديم طلب الإيداع بنجاح. يرجى تحويل المبلغ إلى عنوان TRC-20 المحدد.');
    saveUserState();
}

function updatePlanButtons() {
    var currentTime = new Date().getTime();

    for (var plan in user.activatedPlans) {
        if (user.activatedPlans.hasOwnProperty(plan)) {
            var planData = user.activatedPlans[plan];
            if (planData.expiresAt > currentTime) {
                var button = document.querySelector('#' + plan.toLowerCase() + ' button');
                if (button) {
                    button.disabled = true;
                    button.textContent = 'تم التفعيل';
                }
                var lockIcon = document.getElementById('lock-' + plan.toLowerCase());
                if (lockIcon) {
                    lockIcon.style.display = 'none';
                }
            } else {
                delete user.activatedPlans[plan];
                saveUserState();
            }
        }
    }
}

function updateBalanceDisplay() {
    var balanceElement = document.getElementById('user-balance');
    if (balanceElement) {
        balanceElement.textContent = user.balance.toFixed(2);
    }
}

window.onload = function() {
    var loginSection = document.getElementById('login-section');
    loginSection.style.display = 'block';

    document.getElementById('login-button').onclick = function() {
        var username = document.getElementById('username').value;
        loginUser(username);
        if (currentUser) {
            loginSection.style.display = 'none';
            document.getElementById('main-content').style.display = 'block';
        }
    };

    document.getElementById('register-button').onclick = function() {
        var username = document.getElementById('username').value;
        registerUser(username);
        if (currentUser) {
            loginSection.style.display = 'none';
            document.getElementById('main-content').style.display = 'block';
        }
    };

    if (currentUser) {
        loginSection.style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        updatePlanButtons();
    }

    document.getElementById('logout-button').onclick = function() {
        logoutUser();
        location.reload();
    };

    document.getElementById('scroll-to-deposit').onclick = function() {
        document.getElementById('deposit').scrollIntoView({ behavior: 'smooth' });
    };

    updateBalanceDisplay();
};











var currentUser = localStorage.getItem('currentUser');
var users = JSON.parse(localStorage.getItem('users')) || {};

if (currentUser && users[currentUser]) {
    var user = users[currentUser];
} else {
    var user = {
        balance: 0.00,
        activatedPlans: {},
        pendingDeposits: [],
        pendingWithdrawals: []
    };
}

function saveUserState() {
    users[currentUser] = user;
    localStorage.setItem('users', JSON.stringify(users));
    updateBalanceDisplay();
}

function registerUser(username) {
    if (users[username]) {
        alert('اسم المستخدم موجود بالفعل.');
        return;
    }
    currentUser = username;
    user = {
        balance: 0.00,
        activatedPlans: {},
        pendingDeposits: [],
        pendingWithdrawals: []
    };
    users[currentUser] = user;
    localStorage.setItem('currentUser', currentUser);
    saveUserState();
    alert('تم التسجيل بنجاح!');
    updateBalanceDisplay();
}

function loginUser(username) {
    if (!users[username]) {
        alert('اسم المستخدم غير موجود.');
        return;
    }
    currentUser = username;
    user = users[currentUser];
    localStorage.setItem('currentUser', currentUser);
    alert('تم تسجيل الدخول بنجاح!');
    updatePlanButtons();
    updateBalanceDisplay();
}

function logoutUser() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    alert('تم تسجيل الخروج بنجاح!');
    updateBalanceDisplay();
}

function showNotification(plan, price, dailyProfit) {
    if (!currentUser) {
        alert('يجب عليك تسجيل الدخول لتفعيل خطة.');
        return;
    }

    if (user.activatedPlans[plan]) {
        alert('تم تفعيل هذه الخطة بالفعل.');
        return;
    }

    var notification = document.getElementById('notification');
    notification.style.display = 'block';
    document.getElementById('notification-message').textContent = 'هل تريد تفعيل خطة ' + plan + ' بقيمة $' + price + '؟';

    document.getElementById('confirm-button').onclick = function() {
        if (user.balance >= price) {
            user.balance -= price;
            alert('تم تفعيل الخطة. المتبقي في رصيدك: $' + user.balance.toFixed(2));
            updateBalanceDisplay();

            var activationDate = new Date();
            var expirationDate = new Date();
            expirationDate.setDate(activationDate.getDate() + 30);

            user.activatedPlans[plan] = {
                price: price,
                dailyProfit: dailyProfit,
                activatedAt: activationDate.getTime(),
                expiresAt: expirationDate.getTime()
            };

            saveUserState();

            updatePlanButtons();

            setTimeout(function() {
                alert('انتهت فترة 24 ساعة. سيتم إضافة الربح اليومي: $' + dailyProfit);
                user.balance += dailyProfit;
                alert('تمت إضافة الربح اليومي. الرصيد الحالي: $' + user.balance.toFixed(2));
                saveUserState();
                updateBalanceDisplay();
            }, 24 * 60 * 60 * 1000);
        } else {
            alert('عذرًا، رصيدك الحالي غير كافٍ لتفعيل هذه الخطة. يرجى إيداع المزيد من الأموال للمتابعة.');
        }
        hideNotification();
    };
}

function hideNotification() {
    var notification = document.getElementById('notification');
    notification.style.display = 'none';
}

function depositFunds(amount, trc20Address) {
    if (!currentUser) {
        alert('يجب عليك تسجيل الدخول لإيداع الأموال.');
        return;
    }

    user.pendingDeposits.push({
        amount: amount,
        trc20Address: trc20Address,
        confirmed: false
    });

    alert('تم تقديم طلب الإيداع بنجاح. يرجى تحويل المبلغ إلى عنوان TRC-20 المحدد.');
    saveUserState();
}


function updatePlanButtons() {
    var currentTime = new Date().getTime();

    for (var plan in user.activatedPlans) {
        if (user.activatedPlans.hasOwnProperty(plan)) {
            var planData = user.activatedPlans[plan];
            if (planData.expiresAt > currentTime) {
                var button = document.querySelector('#' + plan.toLowerCase() + ' button');
                if (button) {
                    button.disabled = true;
                    button.textContent = 'تم التفعيل';
                }
                var lockIcon = document.getElementById('lock-' + plan.toLowerCase());
                if (lockIcon) {
                    lockIcon.style.display = 'none';
                }
            } else {
                delete user.activatedPlans[plan];
                saveUserState();
            }
        }
    }
}

function updateBalanceDisplay() {
    var balanceElement = document.getElementById('user-balance');
    if (balanceElement) {
        balanceElement.textContent = user.balance.toFixed(2);
    }
}

window.onload = function() {
    var loginSection = document.getElementById('login-section');
    loginSection.style.display = 'block';

    document.getElementById('login-button').onclick = function() {
        var username = document.getElementById('username').value;
        loginUser(username);
        if (currentUser) {
            loginSection.style.display = 'none';
            document.getElementById('main-content').style.display = 'block';
        }
    };

    document.getElementById('register-button').onclick = function() {
        var username = document.getElementById('username').value;
        registerUser(username);
        if (currentUser) {
            loginSection.style.display = 'none';
            document.getElementById('main-content').style.display = 'block';
        }
    };

    if (currentUser) {
        loginSection.style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        updatePlanButtons();
    }

    document.getElementById('logout-button').onclick = function() {
        logoutUser();
        location.reload();
    };

    document.getElementById('scroll-to-deposit').onclick = function() {
        document.getElementById('deposit').scrollIntoView({ behavior: 'smooth' });
    };

    updateBalanceDisplay();
};


































function showNotification(plan, price, dailyProfit) {
    if (!currentUser) {
        alert('يجب عليك تسجيل الدخول لتفعيل خطة.');
        return;
    }

    if (user.activatedPlans[plan]) {
        alert('تم تفعيل هذه الخطة بالفعل.');
        return;
    }

    var notification = document.getElementById('notification');
    notification.style.display = 'block';
    document.getElementById('notification-message').textContent = 'هل تريد تفعيل خطة ' + plan + ' بقيمة $' + price + '؟';

    document.getElementById('confirm-button').onclick = function() {
        if (user.balance >= price) {
            user.balance -= price;
            alert('تم تفعيل الخطة. المتبقي في رصيدك: $' + user.balance.toFixed(2));

            var activationDate = new Date();
            var expirationDate = new Date();
            expirationDate.setDate(activationDate.getDate() + 30);

            user.activatedPlans[plan] = {
                price: price,
                dailyProfit: dailyProfit,
                activatedAt: activationDate.getTime(),
                expiresAt: expirationDate.getTime()
            };

            saveUserState();

            updatePlanButtons();
        } else {
            alert('عذرًا، رصيدك الحالي غير كافٍ لتفعيل هذه الخطة. يرجى إيداع المزيد من الأموال للمتابعة.');
        }
        hideNotification();
    };
}

function hideNotification() {
    var notification = document.getElementById('notification');
    notification.style.display = 'none';
}








window.onload = function() {
    document.getElementById('withdraw-button').onclick = function() {
        requestWithdrawal(parseFloat(document.getElementById('amount').value), document.getElementById('trc20-address').value);
    };

    // ...
};




















var currentUser = localStorage.getItem('currentUser');
var users = JSON.parse(localStorage.getItem('users')) || {};

if (currentUser && users[currentUser]) {
    var user = users[currentUser];
} else {
    var user = {
        balance: 0.00,
        activatedPlans: {},
        pendingDeposits: []
    };
}

function saveUserState() {
    users[currentUser] = user;
    localStorage.setItem('users', JSON.stringify(users));
}

function registerUser(username) {
    if (users[username]) {
        alert('اسم المستخدم موجود بالفعل.');
        return;
    }
    currentUser = username;
    user = {
        balance: 0.00,
        activatedPlans: {},
        pendingDeposits: []
    };
    users[currentUser] = user;
    localStorage.setItem('currentUser', currentUser);
    saveUserState();
    alert('تم التسجيل بنجاح!');
}

function loginUser(username) {
    if (!users[username]) {
        alert('اسم المستخدم غير موجود.');
        return;
    }
    currentUser = username;
    user = users[currentUser];
    localStorage.setItem('currentUser', currentUser);
    alert('تم تسجيل الدخول بنجاح!');
    updatePlanButtons();
}

function logoutUser() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    alert('تم تسجيل الخروج بنجاح!');
}

function showNotification(plan, price, dailyProfit) {
    if (!currentUser) {
        alert('يجب عليك تسجيل الدخول لتفعيل خطة.');
        return;
    }

    if (user.activatedPlans[plan]) {
        alert('تم تفعيل هذه الخطة بالفعل.');
        return;
    }

    var notification = document.getElementById('notification');
    notification.style.display = 'block';
    document.getElementById('notification-message').textContent = 'هل تريد تفعيل خطة ' + plan + ' بقيمة $' + price + '؟';

    document.getElementById('confirm-button').onclick = function() {
        if (user.balance >= price) {
            user.balance -= price;
            alert('تم تفعيل الخطة. المتبقي في رصيدك: $' + user.balance.toFixed(2));

            var activationDate = new Date();
            var expirationDate = new Date();
            expirationDate.setDate(activationDate.getDate() + 30);

            user.activatedPlans[plan] = {
                price: price,
                dailyProfit: dailyProfit,
                activatedAt: activationDate.getTime(),
                expiresAt: expirationDate.getTime()
            };

            saveUserState();

            updatePlanButtons();

            setTimeout(function() {
                alert('انتهت فترة 24 ساعة. سيتم إضافة الربح اليومي: $' + dailyProfit);
                user.balance += dailyProfit;
                alert('تمت إضافة الربح اليومي. الرصيد الحالي: $' + user.balance.toFixed(2));
                saveUserState();
            }, 24 * 60 * 60 * 1000);
        } else {
            alert('عذرًا، رصيدك الحالي غير كافٍ لتفعيل هذه الخطة. يرجى إيداع المزيد من الأموال للمتابعة.');
        }
        hideNotification();
    };
}

function hideNotification() {
    var notification = document.getElementById('notification');
    notification.style.display = 'none';
}

function depositFunds(amount, trc20Address) {
    if (!currentUser) {
        alert('يجب عليك تسجيل الدخول لإيداع الأموال.');
        return;
    }

    user.pendingDeposits.push({
        amount: amount,
        trc20Address: trc20Address,
        confirmed: false
    });

    alert('تم تقديم طلب الإيداع بنجاح. يرجى تحويل المبلغ إلى عنوان TRC-20 المحدد.');
    saveUserState();
}

function updatePlanButtons() {
    var currentTime = new Date().getTime();

    for (var plan in user.activatedPlans) {
        if (user.activatedPlans.hasOwnProperty(plan)) {
            var planData = user.activatedPlans[plan];
            if (planData.expiresAt > currentTime) {
                var button = document.querySelector('#' + plan.toLowerCase() + ' button');
                if (button) {
                    button.disabled = true;
                    button.textContent = 'تم التفعيل';
                }
                var lockIcon = document.getElementById('lock-' + plan.toLowerCase());
                if (lockIcon) {
                    lockIcon.style.display = 'none';
                }
            } else {
                delete user.activatedPlans[plan];
                saveUserState();
            }
        }
    }
}

window.onload = function() {
    var loginSection = document.getElementById('login-section');
    loginSection.style.display = 'block';

    document.getElementById('login-button').onclick = function() {
        var username = document.getElementById('username').value;
        loginUser(username);
        if (currentUser) {
            loginSection.style.display = 'none';
            document.getElementById('main-content').style.display = 'block';
            document.getElementById('user-balance').textContent = user.balance.toFixed(2);
        }
    };

    document.getElementById('register-button').onclick = function() {
        var username = document.getElementById('username').value;
        registerUser(username);
        if (currentUser) {
            loginSection.style.display = 'none';
            document.getElementById('main-content').style.display = 'block';
            document.getElementById('user-balance').textContent = user.balance.toFixed(2);
        }
    };

    document.getElementById('logout-button').onclick = function() {
        logoutUser();
        document.getElementById('main-content').style.display = 'none';
        loginSection.style.display = 'block';
    };

    updatePlanButtons();
};




window.onload = function() {
    document.getElementById('withdraw-button').onclick = function() {
        var amount = parseFloat(document.getElementById('amount').value);
        var trc20Address = document.getElementById('trc20-address').value;
        if (amount && trc20Address) {
            requestWithdrawal(amount, trc20Address);
        } else {
            alert('يرجى إدخال جميع البيانات المطلوبة.');
        }
    };

    if (localStorage.getItem('countdownEndTime')) {
        updateCountdown();
    }
};

function requestWithdrawal(amount, trc20Address) {
    if (!currentUser) {
        alert('يجب عليك تسجيل الدخول لسحب الأموال.');
        return;
    }

    if (user.balance < amount) {
        alert('عذرًا، رصيدك الحالي غير كافٍ للسحب.');
        return;
    }

    user.balance -= amount;
    user.pendingWithdrawals.push({
        amount: parseFloat(amount),
        trc20Address: trc20Address,
        confirmed: false,
        requestedAt: new Date().getTime()
    });

    saveUserState();
    saveWithdrawalRequest(amount, trc20Address);

    // عرض رسالة نجاح السحب
    var withdrawMessage = document.getElementById('withdraw-message');
    withdrawMessage.textContent = 'تم تقديم طلب السحب بنجاح. سيتم معالجة السحب في غضون 10 دقائق.';

    // بدء العد التنازلي لمدة 10 دقائق
    startCountdown();
}







var amount = parseFloat(document.getElementById('amount').value);
var trc20Address = document.getElementById('trc20-address').value;


requestWithdrawal(amount, trc20Address);



window.onload = function() {
    document.getElementById('withdraw-button').onclick = function() {
        var amount = parseFloat(document.getElementById('amount').value);
        var trc20Address = document.getElementById('trc20-address').value;
        if (amount && trc20Address) {
            console.log('تفاصيل السحب:', { amount, trc20Address });
            requestWithdrawal(amount, trc20Address);
        } else {
            alert('يرجى إدخال جميع البيانات المطلوبة.');
            console.log('بيانات غير مكتملة:', { amount, trc20Address });
        }
    };
};

    // إذا كان هناك مستخدم حالي، جلب بياناته، وإلا إنشاء مستخدم جديد
    if (currentUser && users[currentUser]) {
        var user = users[currentUser];
    } else {
        var user = {
            balance: 0.00,
            activatedPlans: {},
            pendingDeposits: [],
            pendingWithdrawals: []
        };
    }

    // حفظ حالة المستخدم في التخزين المحلي
    function saveUserState() {
        users[currentUser] = user;
        localStorage.setItem('users', JSON.stringify(users));
        console.log("تم حفظ حالة المستخدم:", user);
    }




var currentUser = localStorage.getItem('currentUser');
var users = JSON.parse(localStorage.getItem('users')) || {};

if (currentUser && users[currentUser]) {
    var user = users[currentUser];
} else {
    var user = {
        balance: 0.00,
        activatedPlans: {},
        pendingDeposits: []
    };
}

function saveUserState() {
    users[currentUser] = user;
    localStorage.setItem('users', JSON.stringify(users));
}

function registerUser(username) {
    if (users[username]) {
        alert('اسم المستخدم موجود بالفعل.');
        return;
    }
    currentUser = username;
    user = {
        balance: 0.00,
        activatedPlans: {},
        pendingDeposits: []
    };
    users[currentUser] = user;
    localStorage.setItem('currentUser', currentUser);
    saveUserState();
    alert('تم التسجيل بنجاح!');
}

function loginUser(username) {
    if (!users[username]) {
        alert('اسم المستخدم غير موجود.');
        return;
    }
    currentUser = username;
    user = users[currentUser];
    localStorage.setItem('currentUser', currentUser);
    alert('تم تسجيل الدخول بنجاح!');
    updateUserInterface();
}

function logoutUser() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    alert('تم تسجيل الخروج بنجاح!');
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
}

function showNotification(plan, price, dailyProfit) {
    if (!currentUser) {
        alert('يجب عليك تسجيل الدخول لتفعيل خطة.');
        return;
    }

    if (user.activatedPlans[plan]) {
        alert('تم تفعيل هذه الخطة بالفعل.');
        return;
    }

    var notification = document.getElementById('notification');
    notification.style.display = 'block';
    document.getElementById('notification-message').textContent = 'هل تريد تفعيل خطة ' + plan + ' بقيمة $' + price + '؟';

    document.getElementById('confirm-button').onclick = function() {
        if (user.balance >= price) {
            user.balance -= price;
            alert('تم تفعيل الخطة. المتبقي في رصيدك: $' + user.balance.toFixed(2));

            var activationDate = new Date();
            var expirationDate = new Date();
            expirationDate.setDate(activationDate.getDate() + 30);

            user.activatedPlans[plan] = {
                price: price,
                dailyProfit: dailyProfit,
                activatedAt: activationDate.getTime(),
                expiresAt: expirationDate.getTime()
            };

            saveUserState();
            updateUserInterface();

            setTimeout(function() {
                alert('انتهت فترة 24 ساعة. سيتم إضافة الربح اليومي: $' + dailyProfit);
                user.balance += dailyProfit;
                alert('تمت إضافة الربح اليومي. الرصيد الحالي: $' + user.balance.toFixed(2));
                saveUserState();
                updateUserInterface();
            }, 24 * 60 * 60 * 1000);
        } else {
            alert('عذرًا، رصيدك الحالي غير كافٍ لتفعيل هذه الخطة. يرجى إيداع المزيد من الأموال للمتابعة.');
        }
        hideNotification();
    };
}

function hideNotification() {
    var notification = document.getElementById('notification');
    notification.style.display = 'none';
}

function depositFunds(amount, trc20Address) {
    if (!currentUser) {
        alert('يجب عليك تسجيل الدخول لإيداع الأموال.');
        return;
    }

    user.pendingDeposits.push({
        amount: amount,
        trc20Address: trc20Address,
        confirmed: false
    });

    alert('تم تقديم طلب الإيداع بنجاح. يرجى تحويل المبلغ إلى عنوان TRC-20 المحدد.');
    saveUserState();
}

function updateUserInterface() {
    document.getElementById('user-balance').textContent = user.balance.toFixed(2);
    updatePlanButtons();
}

function updatePlanButtons() {
    var currentTime = new Date().getTime();

    for (var plan in user.activatedPlans) {
        if (user.activatedPlans.hasOwnProperty(plan)) {
            var planData = user.activatedPlans[plan];
            if (planData.expiresAt > currentTime) {
                var button = document.querySelector('#' + plan.toLowerCase() + ' button');
                if (button) {
                    button.disabled = true;
                    button.textContent = 'تم التفعيل';
                }
                var lockIcon = document.getElementById('lock-' + plan.toLowerCase());
                if (lockIcon) {
                    lockIcon.style.display = 'none';
                }
            } else {
                delete user.activatedPlans[plan];
                saveUserState();
            }
        }
    }
}

window.onload = function() {
    var loginSection = document.getElementById('login-section');
    if (currentUser) {
        loginSection.style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        document.getElementById('user-balance').textContent = user.balance.toFixed(2);
        updatePlanButtons();
    } else {
        loginSection.style.display = 'block';
    }

    document.getElementById('login-button').onclick = function() {
        var username = document.getElementById('username').value;
        loginUser(username);
    };

    document.getElementById('register-button').onclick = function() {
        var username = document.getElementById('username').value;
        registerUser(username);
    };

    document.getElementById('logout-button').onclick = function() {
        logoutUser();
    };
};








document.getElementById('scroll-to-deposit').onclick = function() {
    document.getElementById('deposit').scrollIntoView({ behavior: 'smooth' });
};





















































// Function to save user state
function saveUserState() {
    users[currentUser] = user;
    localStorage.setItem('users', JSON.stringify(users));
}

// Function to register a new user
function registerUser(username) {
    if (users[username]) {
        alert('اسم المستخدم موجود بالفعل.');
        return;
    }
    initializeUser(username);
    saveUserState();
    alert('تم التسجيل بنجاح!');
}

// Function to log in a user
function loginUser(username) {
    if (!users[username]) {
        alert('اسم المستخدم غير موجود.');
        return;
    }
    currentUser = username;
    user = users[currentUser];
    localStorage.setItem('currentUser', currentUser);
    alert('تم تسجيل الدخول بنجاح!');
    updatePlanButtons();
}

// Function to log out a user
function logoutUser() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    alert('تم تسجيل الخروج بنجاح!');
    initializeUser(''); // Reset to default or prompt for new registration
    location.reload(); // Refresh the page or handle UI changes as needed
}




















































































































function sendAdminNotification(username, email) {
    console.log('مستخدم جديد أو سجل الدخول\nالاسم: ' + username + '\nالبريد الإلكتروني: ' + email);
    var subject = encodeURIComponent('إشعار جديد للتسجيل/الدخول');
    var body = encodeURIComponent('مستخدم جديد أو سجل الدخول\nالاسم: ' + username + '\nالبريد الإلكتروني: ' + email);
    window.open('mailto:admin@example.com?subject=' + subject + '&body=' + body);
    alert('تم إرسال إشعار للمسؤول.');
}


























































































































function logoutUser() {
    const userId = getCurrentUserId();
    delete users[userId];
    // Clear other user data, such as local storage
  }





  function loginUser(username) {
    const userId = getUsernameToUserIdMap()[username];
    if (userId) {
      const userData = users[userId];
      // Update the UI with the user's data
    }
  }







  const users = {};
const usernameToUserIdMap = {};

function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}

function registerUser(username) {
  const userId = generateUniqueId();
  users[userId] = {
    balance: 0.00,
    activatedPlans: {},
    pendingDeposits: []
  };
  usernameToUserIdMap[username] = userId;
  // Update the UI with the new user's data
  updateUserDataUI(userId);
}

function loginUser(username) {
  const userId = usernameToUserIdMap[username];
  if (userId) {
    const userData = users[userId];
    // Update the UI with the user's data
    updateUserDataUI(userId);
  }
}














// افترض أن userBalance هو المتغير الذي يحمل رصيد المستخدم الحالي
var userBalance = 1000; // يمكنك تعيين هذا بقيمة افتراضية أو استرجاعه من قاعدة البيانات

// تحديث عرض الرصيد الحالي
function updateBalanceDisplay() {
    document.getElementById("userBalanceDisplay").textContent = "$" + userBalance.toFixed(2); // تحديث عرض الرصيد مع تحديد العدد الثابت للأرقام العشرية
}

// عملية السحب
document.getElementById("withdrawalForm").addEventListener("submit", function(event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة بعد النقر على زر الإرسال

    var withdrawalAmount = parseFloat(document.getElementById("withdrawalAmount").value);

    // التحقق إذا كان المبلغ المطلوب للسحب صالحاً (أكبر من صفر وأقل من أو يساوي رصيد المستخدم)
    if (withdrawalAmount > 0 && withdrawalAmount <= userBalance) {
        // تنفيذ عملية السحب
        userBalance -= withdrawalAmount;
        // تحديث عرض الرصيد
        updateBalanceDisplay();
        // عرض رسالة نجاح
        alert("تم السحب بنجاح!");
    } else {
        // عرض رسالة خطأ إذا كان المبلغ غير صالح
        alert("خطأ: المبلغ المطلوب للسحب غير صالح!");
    }
});


















function showRegisterForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
}

function showLoginForm() {
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.innerText = message;
    setTimeout(() => {
        notification.innerText = '';
    }, 3000);
}

function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // هنا يجب التحقق من بيانات تسجيل الدخول (يمكن أن تكون عبر استدعاء API)
    if (email === 'test@example.com' && password === 'password') {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('user-info').style.display = 'block';
        document.getElementById('user-name').innerText = 'اسم المستخدم';
        showNotification('تم تسجيل الدخول بنجاح');
    } else {
        showNotification('خطأ في البريد الإلكتروني أو كلمة المرور');
    }
}

function register() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('register-email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        showNotification('كلمتا المرور غير متطابقتين');
        return;
    }

    // هنا يجب إرسال بيانات التسجيل إلى السيرفر (يمكن أن تكون عبر استدعاء API)
    showNotification('تم إنشاء الحساب بنجاح');
    showLoginForm();
}

function logout() {
    document.getElementById('user-info').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
    showNotification('تم تسجيل الخروج');
}




























function validateContactForm() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;
    
    if (!name || !email || !message) {
        alert('يرجى ملء جميع الحقول.');
        return false;
    }
    
    // إرسال البريد الإلكتروني
    sendEmail(name, email, message);

    alert('تم إرسال رسالتك بنجاح!');

    return true;
}












function sendEmail(name, email, message) {
    var subject = 'رسالة جديدة من ' + name;
    var body = 'البريد الإلكتروني: ' + email + '\n\n' +
               'الرسالة: \n' + message;
    var mailto_link = 'mailto:amastthmar@gmail.com' +
                      '?subject=' + encodeURIComponent(subject) +
                      '&body=' + encodeURIComponent(body);

    var win = window.open(mailto_link, 'emailWindow');
    if (win && win.open && !win.closed) {
        win.close();
    }
}



































































function registerUser(username, email) {
    if (users[username]) {
        alert('اسم المستخدم موجود بالفعل.');
        return;
    }
    if (!validateEmail(email)) {
        alert('البريد الإلكتروني غير صالح.');
        return;
    }
    currentUser = username;
    user = {
        balance: 0.00,
        activatedPlans: {},
        pendingDeposits: [],
        email: email
    };
    users[currentUser] = user;
    localStorage.setItem('currentUser', currentUser);
    saveUserState();
    alert('تم التسجيل بنجاح!');
}

function validateEmail(email) {
    // Very basic email validation, you may want to use a more robust method
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}




















document.getElementById('register-button').onclick = function() {
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    registerUser(username, email);
    if (currentUser) {
        loginSection.style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        document.getElementById('user-balance').textContent = user.balance.toFixed(2);
    }
};




































































function sendEmailNotification(type, details) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "send_notification.php", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("Email sent successfully.");
        }
    };
    xhr.send(JSON.stringify({ type: type, details: details }));
}

// Update the approveWithdrawal function
function approveWithdrawal(index) {
    var withdrawal = withdrawals[index];
    var user = users[withdrawal.user];

    if (user && user.balance >= withdrawal.amount) {
        user.balance -= withdrawal.amount;
        withdrawal.status = 'approved';
        saveUserState();
        saveWithdrawals();
        alert('تمت الموافقة على السحب. تم خصم المبلغ من حساب المستخدم.');
        sendEmailNotification('withdrawal', withdrawal);
        location.reload();
    } else {
        alert('رصيد المستخدم غير كافٍ للسحب.');
    }
}

// Update the confirmDeposit function
function confirmDeposit(username, index) {
    if (users[username] && users[username].pendingDeposits[index]) {
        var deposit = users[username].pendingDeposits[index];
        if (!deposit.confirmed) {
            users[username].balance += parseFloat(deposit.amount);
            deposit.confirmed = true;
            localStorage.setItem('users', JSON.stringify(users));
            var newBalance = users[username].balance.toFixed(2);
            alert('تم تأكيد الإيداع بنجاح. الرصيد الحالي للمستخدم: $' + newBalance);
            activateOffer(username); // Activate offer upon deposit confirmation
            sendEmailNotification('deposit', { user: username, amount: deposit.amount, trc20Address: deposit.trc20Address, timestamp: Date.now() });
            loadPendingDeposits();
        }
    }
}














const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// أي شيء آخر تحتاجه لتكون متصلًا بقاعدة بيانات أو لإدارة عمليات المستخدمين

io.on('connection', (socket) => {
    console.log('New client connected');
    
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});


















fetch('https://api.example.com/data', {
    method: 'GET', // أو 'POST' إذا كنت ترسل بيانات
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
  























































// Initialize Firebase
firebase.initializeApp({
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID"
});

// Initialize Firestore
const db = firebase.firestore();

// Example: Add a new document in collection "users"
db.collection("users").add({
    name: "Ahmed",
    email: "ahmed@example.com"
})
.then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
})
.catch((error) => {
    console.error("Error adding document: ", error);
});





  






















document.getElementById('userForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email })
    });

    if (response.ok) {
        alert('تم إرسال البيانات بنجاح!');
    } else {
        alert('حدث خطأ أثناء إرسال البيانات.');
    }
});














$('#register-button').click(function() {
    var name = $('#name').val();
    var email = $('#email').val();
    var password = $('#password').val();
    $.post('registration.php', { name: name, email: email, password: password }, function(response) {
        alert(response);
        if (response.includes("success")) {
            location.reload();
        }
    });
});



function withdrawFunds(user_id, amount) {
    $.post('withdrawal.php', { user_id: user_id, amount: amount }, function(response) {
        alert(response);
    });
}






document.addEventListener('DOMContentLoaded', function() {
    // معالجة النموذج بعد الإرسال
    document.getElementById('register-form').addEventListener('submit', function(e) {
        alert('تم إنشاء الحساب بنجاح! يرجى تسجيل الدخول.');
    });

    document.getElementById('login-form').addEventListener('submit', function(e) {
        alert('تم تسجيل الدخول بنجاح!');
    });
});








































































