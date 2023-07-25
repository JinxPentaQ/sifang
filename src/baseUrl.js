var usrId = sessionStorage.getItem("usrId");
var user = sessionStorage.getItem("name");
var auth = sessionStorage.getItem("auth");
var type = sessionStorage.getItem("type");
if (usrId != null) {
    usrId = usrId.replace(/\"/g, "");
}
if (user != null) {
    user = user.replace(/\"/g, "");
}
if (auth != null) {
    auth = auth.replace(/\"/g, "");
}
if (type != null) {
    type = auth.replace(/\"/g, "");
}

const BASE_URL1 = "http://htadminser.wmpay7.com/"
const BASE_URL2 = "http://htadminser.wmpay7.com/"


// 验证手机
var checkPhone = (rule, value, callback) => {
    if (!value) {
        return callback(new Error("手机号不能为空"));
    } else {
        const reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/;
        // console.log(reg.test(value));
        if (reg.test(value)) {
            callback();
        } else {
            return callback(new Error("请输入正确的手机号"));
        }
    }
};
// 验证座机
var checkTel = (rule, value, callback) => {
    const reg = /^0\d{2,3}-?\d{7,8}$/;
    const reg2 = /^1[3|4|5|7|8|9][0-9]\d{8}$/;
    if (reg.test(value) || reg2.test(value) || value == "" || value == " ") {
        callback();
    } else {
        return callback(new Error("请输入正确的电话号"));
    }
};
// 验证身份证号
var checkIdNo = (rule, value, callback) => {
    const reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    // console.log(reg.test(value));
    if (reg.test(value)) {
        callback();
    } else {
        return callback(new Error("请输入正确的身份证号"));
    }
};
// 验证只能是英文字符
var checkWord = (rule, value, callback) => {
    const reg = /^[a-zA-Z]+$/gi;
    // console.log(reg.test(value));
    if (reg.test(value) || value == "") {
        callback();
    } else {
        return callback(new Error("请输入英文字符"));
    }
};
// 密码
var checkPwd = (rule, value, callback) => {
    const reg = /^(\w){6,20}$/;
    // console.log(reg.test(value));
    if (reg.test(value) || value == "") {
        callback();
    } else {
        return callback(new Error("只能输入6-20个字母、数字、下划线"));
    }
};
// 验证用户名
var checkUser = (rule, value, callback) => {
    const reg = /^[\w\u3E00-\u9FA5]+$/;
    // console.log(reg.test(value));
    if (reg.test(value) || value == "") {
        callback();
    } else {
        return callback(new Error("请输入正确的用户名"));
    }
};
// 验证真实姓名
var truekName = (rule, value, callback) => {
    const reg = /^[\u3E00-\u9FA5]{1,20}$/;
    // console.log(reg.test(value));
    if (reg.test(value) || value == "") {
        callback();
    } else {
        return callback(new Error("请输入正确的真实姓名，长度为20以内"));
    }
};
// 验证邮箱
var checkEmail = (rule, value, callback) => {
    const reg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    if (reg.test(value) || value == "" || value == null) {
        callback();
    } else {
        return callback(new Error("邮箱格式不正确"));
    }
};
// 验证是否有特殊字符
var checkVal = (rule, value, callback) => {
    const reg = /^[\u4e00-\u9fa5a-zA-Z0-9()（）：:；; =，, ]+$/gi;
    if (reg.test(value) || value == "") {
        callback();
    } else {
        return callback(new Error("不允许输入特殊字符"));
    }
};
// 判断数字
var isNumber = (rule, value, callback) => {
    const reg = /^[\d\.\,]*$/;
    if (reg.test(value) || value == "" || value == null) {
        callback();
    } else {
        return callback(new Error("请输入数字"));
    }
};
// 判断中文
var isChinese = (rule, value, callback) => {
    const reg = /^[\u4e00-\u9fa5]+$/;
    if (reg.test(value) || value == "" || value == null) {
        callback();
    } else {
        return callback(new Error("请输入中文"));
    }
};
// 验证手机可以为空
var checkPhoneOpen = (rule, value, callback) => {
    const reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/;
    if (reg.test(value) || value == "" || value == null) {
        callback();
    } else {
        return callback(new Error("请输入正确的手机号"));
    }
};
// 验证中文可以有括号
var checkValSpe = (rule, value, callback) => {
    const reg = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im;

    // console.log(reg.test(value));
    if (reg.test(value) || value == "") {
        callback();
    } else {
        return callback(new Error("不能输入特殊字符"));
    }
};
// 营业执照可以为数字 或数字字母组合
var checkCer = (rule, value, callback) => {
    const reg = /^[0-9a-zA-Z]*$/g;
    if (reg.test(value) || value == "") {
        callback();
    } else {
        return callback(new Error("请输入数字或数字字母组合"));
    }
};
// 邮箱或者手机号
var phoneEmail = (rule, value, callback) => {
    const reg = /^[0-9a-zA-Z@,，.]*$/g;
    if (reg.test(value)) {
        callback();
    } else {
        return callback(new Error("请输入正确的手机号或者邮箱"));
    }
};

var httpCheck = (rule, value, callback) => {
    const reg = /^http:\/\//;
    if (reg.test(value)) {
        callback();
    } else {
        return callback(new Error("请输入正确的网关地址"));
    }
};

var paramCheck = (rule, value, callback) => {
    if (value == 0) {
        callback(new Error("渠道参数的格式为key:value;key:value;"));
    }
    callback();
};

// 将通讯录按照 ABCD字母的顺序排序
var sortObjByKey = (obj) => {
    var keys = Object.keys(obj).sort();
    var newObj = {};
    for (var i = 0; i < keys.length; i++) {
        var index = keys[i];
        newObj[index] = obj[index];
    }
    return newObj;
};
//获取本月第一天和最后一天
var getNowMonthDate = () => {
    var date = new Date();
    var year = date.getFullYear() + "";
    var month = date.getMonth() + 1 + "";
    // 本月第一天日期
    var begin = year + "-" + month + "-01 00:00:00";
    // 本月最后一天日期
    var lastDateOfCurrentMonth = new Date(year, month, 0);
    var end =
        year +
        "-" +
        month +
        "-" +
        lastDateOfCurrentMonth.getDate() +
        " 59:59:59";
    // return begin + "-" + end;
    return [begin, end];
}
export default {
    usrId,
    user,
    auth,
    type,
    BASE_URL1,
    BASE_URL2,
    checkPhone,
    checkUser,
    truekName,
    checkVal,
    checkEmail,
    isNumber,
    isChinese,
    checkWord,
    checkPwd,
    checkTel,
    checkIdNo,
    checkPhoneOpen,
    checkCer,
    phoneEmail,
    httpCheck,
    paramCheck,
    sortObjByKey,
    getNowMonthDate,
};
