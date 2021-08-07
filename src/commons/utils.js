/*
*防抖函数，debounce  用于有很频繁的操作，但其实结果只需要一次就够了。
*在这里的应用场景是， 每一次请求会加载30张图片，每加载一张图片就会去发射事件去重新设置scroll滚动条的高度，
*由于网络很快，加载的图片的速度很快，就会进行很快的30次操作，但其实只需要最后一次加载完成时，去设置scrool的高度。
*
*
* 所以用防抖函数解决此问题，设置一个时间如500ms， 执行一个函数funA，如果500ms之内又需要执行这个函数则不执行，
* 就会有一个间隔 500ms        直到最后一次执行这个函数，500ms之内它没有别的操作了，就执行真正的操作，节约性能。
*
*
* 所以：在这里的30次请求图片问题也可这样解决，设置一个时间500ms，当第一张图片加载完成 触发事件，而只过了10ms第二张图片
* 也加载完成又 要触发事件，而中间的间隔10ms小于500ms所以上一次的事件不执行，  直到500ms期间再没有图片加载就才执行事件，节约性能
*
*
* */
export function debounce(func,delay) {           //func为需要操作的业务函数，   delay为延迟时间
    let timer=null;
    return function (...args) {
        if(timer){
            clearTimeout(timer)
        }
        timer=setTimeout(()=>{
            func.apply(this,args)
        },delay)
    }
}


//将时间总数转成时间格式
export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    let o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds()
    };

    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + "";
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
        }
    }

    return fmt;
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
};