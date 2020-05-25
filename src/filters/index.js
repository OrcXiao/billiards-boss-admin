const filters = {
    Filter_FormatDate(time) {
        let date = new Date(time);
        let yy = date.getFullYear();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();
        let h = date.getHours();
        let m = date.getMinutes();
        let s = date.getSeconds();
        return yy
            + ('-')
            + (mm < 10 ? '0' + mm : mm)
            + ('-')
            + (dd < 10 ? '0' + dd : dd)
            + (' ')
            + (h < 10 ? '0' + h : h)
            + (':')
            + (m < 10 ? '0' + m : m)
            + (':')
            + (s < 10 ? '0' + s : s)

    },
};

export default filters
