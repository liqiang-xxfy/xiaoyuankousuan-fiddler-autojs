// 获取设备的宽高
var width = device.width;
var height = device.height;
log("设备宽度: " + width);
log("设备高度: " + height);


// 使用autojs的shell方法执行adb命令
function clearAppCache(packageName) {
    var cachePath = "/data/data/" + packageName + "/cache/WebView/*";
    var command = "rm -rf " + cachePath;

    // 执行shell命令
    var result = shell(command, true);
    
    // 判断是否执行成功
    if (result.code == 0) {
        console.log("缓存清理成功");
        return true;
    } else {
        console.log("缓存清理失败，错误信息: " + result.stderr);
        return false;
    }
}

// 调用函数，传入你想清理缓存的应用包名
clearAppCache("com.fenbi.android.leo");