// 获取设备的宽高
var width = device.width;
var height = device.height;
log("设备宽度: " + width);
log("设备高度: " + height);

//
var color = "#ff0000"; // 红色
var threshold = 0.97; // 设置相似度
var completionTimes = 0; //

// 请求截图权限
if (!requestScreenCapture()) {
    log("请求截图失败");
    exit();
}

// 获取屏幕截图
var screen = captureScreen();
// 定义保存路径
var filePath = "/sdcard/$MuMu12Shared/Pictures/screenshot.png"; // 将图片保存到手机存储的根目录

// 保存截图为 PNG 文件
images.save(screen, filePath, "png");
log("截图已保存到 " + filePath);

// 定义要匹配的多个点及其颜色（x, y, color）
var points1 = [
    { x: 521, y: 1272, color: "#ff543122" }, //
    { x: 589, y: 1269, color: "#ffffd840" }, //
    { x: 551, y: 1328, color: "#ffffbc11" }, //
];
// 定义要匹配的多个点及其颜色（x, y, color） 629|1347|00385E,672|1348|4ADAFB,629|1403|530F1E
var points2 = [
    { x: 802, y: 1526, color: "#ffffd728" }, //
    { x: 688, y: 1527, color: "#ff5e3b22" }, //
    { x: 716, y: 1555, color: "#ffffd728" }, //
];

var points3 = [
    { x: 629, y: 1347, color: "#ff5e3800" }, //
    { x: 672, y: 1348, color: "#fffbda4a" }, //
    { x: 629, y: 1403, color: "#ff1e0f53" }, //
];
var pointsError = [
    { x: 525, y: 935, color: "#ffffca24" }, //
    { x: 485, y: 930, color: "#ff272727" }, //
    { x: 458, y: 679, color: "#ffcecece" }, //
];

//匹配第一个页面
function testFirstPage() {
    return points1.every(point => {
        var actualColor = images.pixel(screen, point.x, point.y);
        actualColor = colors.toString(actualColor);
        return colors.isSimilar(point.color, actualColor, threshold);
    });
}
//匹配第二个页面
function testSecondPage() {
    return points2.every(point => {
        var actualColor = images.pixel(screen, point.x, point.y);
        actualColor = colors.toString(actualColor);
        return colors.isSimilar(point.color, actualColor, threshold);
    });
}

//匹配第三个页面
function testThreePage() {
    return points3.every(point => {
        var actualColor = images.pixel(screen, point.x, point.y);
        actualColor = colors.toString(actualColor);
        return colors.isSimilar(point.color, actualColor, threshold);
    });
}
//匹配出错页面
function testErrorPage() {
    return pointsError.every(point => {
        var actualColor = images.pixel(screen, point.x, point.y);
        actualColor = colors.toString(actualColor);
        return colors.isSimilar(point.color, actualColor, threshold);
    });
}
while (true) {
    screen.recycle(); // 使用完毕后，手动释放图片资源
    screen = captureScreen();
    // 你的脚本逻辑
    if (testFirstPage()) {
        completionTimes++;
        if (completionTimes % 5 === 0) {
            log("completionTimes: " + completionTimes);
        }
        // console.log("completionTimes===============》: " + completionTimes);
        click(521, 1272);
        sleep(700);
        click(784, 1529);
        sleep(1000);
        click(702, 1344);
        sleep(150);
    } else if (testSecondPage()) {
        // console.log("testSecondPage===============》: ");
        click(784, 1529);
        sleep(1000);
        click(702, 1344);
        sleep(150);
    } else if (testThreePage()) {
        // console.log("testThreePage===============》: ");
        click(702, 1344);
        sleep(150);
    } else if (testErrorPage()) {
        // console.log("testErrorPage===============》: ");
        click(449, 929);
        sleep(150);
    } else {
        // console.log("no page===============》: ");
    }
    // 等待指定的时间后继续执行
    sleep(150);
}
