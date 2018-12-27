window.onload = eventWindowLoaded;
function eventWindowLoaded() {

    var today = new Date();
    var yearNow = today.getFullYear();
    var monthNow = today.getMonth();
    var listMonth = document.getElementsByClassName('month-js');//danh sach các thang1 => mảng chưa tên các tháng
    var nameDay = document.getElementsByClassName('nameday-js');
    var preM = document.getElementById('preM');
    var preY = document.getElementById('preY');
    var nextM = document.getElementById('nextM');
    var nextY = document.getElementById('nextY');
    var tbody = document.getElementById('showday-js');
    var listTR = document.getElementsByTagName("tr");
    var inputCalendar = document.getElementById('calendar');
    var tableCalendar = document.getElementById('js-table');
    var setYear = yearNow;
    var tr;
    var td;
    inputCalendar.addEventListener("click", clickCalendar);

    preM.onclick = function () {
        listTR = document.getElementsByTagName("tr");
        if (monthNow > 0)
        {
            monthNow = monthNow - 1;
            for (var i = 0; i <= listTR.length + 2; i++)
            {
                tbody.removeChild(listTR[2]);
            }
            Calendar();
        }
    };
    preY.onclick = function () {
        listTR = document.getElementsByTagName("tr");
        if (yearNow >= 1950 && yearNow <= yearNow + 20) {
            yearNow = yearNow - 1;
            for (var i = 0; i <= listTR.length + 2; i++)
            {
                tbody.removeChild(listTR[2]);
            }
            Calendar();
        }
    };
    nextM.onclick = function () {
        listTR = document.getElementsByTagName("tr");
        if (monthNow < 11)
        {
            monthNow = monthNow + 1;
            for (var i = 0; i <= listTR.length + 2; i++)
            {
                tbody.removeChild(listTR[2]);
            }
            Calendar();
        }
    };
    nextY.onclick = function () {

        if (yearNow > 1950 && yearNow < setYear + 20) {
            yearNow = yearNow + 1;
            clearCalendar();
            Calendar();
        }
    };
    function clearCalendar()
    {
        //listTR = document.getElementsByTagName("tr");
        for (var i = 0; i <= listTR.length + 2; i++)
        {
            tbody.removeChild(listTR[2]);
        }
    }
    ;
    function clickCalendar() {
        var input = document.getElementById('calendar');

        inputCalendar.removeEventListener("click", clickCalendar);//remove event
        Calendar();
        tableCalendar.style.display = "block";
    }
    ;
    function Calendar() {

        createYearNow();
        createMonthNow();
        // var firstDate = listMonth[monthNow].value + " " + 1 + " " + yearNow;// day 01 of month and year
        var firstDate = listMonth[monthNow].textContent + " " + 1 + " " + yearNow;// day 01 of month and year
        // alert(listMonth[monthNow].value);
        var dayofweek = new Date(firstDate).toDateString();// ngày trong tuần, thứ ... ngày 1 tháng ... năm...

        var firstDay = dayofweek.substring(0, 3);
        var totalDayOfMonth = new Date(yearNow, monthNow + 1, 0).getDate();//ngày of month tổng tháng cp1 bao nhiêu ngày
        var day;
        // alert(nameDay.length + " " + nameDay[3].textContent);
        for (var i = 0; i < nameDay.length; i++) {
            //alert("name: " + nameDay[i].textContent + "==" + firstDay);
            if (nameDay[i].textContent === firstDay) {
                day = i; //Ngày bắt đầu đếm
            }
        }
        createDay(day, totalDayOfMonth);

        function createYearNow() {
            var listyear = document.getElementById('year-js');
            listyear.options.length = 0;
            var node;
            var textNode;

            for (var i = 1950; i <= setYear + 20; i++) {
                node = document.createElement('OPTION');
                textNode = document.createTextNode(i);
                node.appendChild(textNode);
                if (i === yearNow)
                {
                    node.setAttribute('selected', 'selected');
                }
                node.setAttribute('value', i);
                listyear.appendChild(node);
            }
        }
        function createMonthNow() {
            var listMonth = document.getElementsByClassName('month-js');
            for (var i = 0; i < listMonth.length; i++) {
                listMonth[i].value = i;
            }
            listMonth[monthNow].selected = true;
            //listMonth[monthNow].setAttribute('selected', 'selected');
        }
        function createDay(day, totalDayOfMonth) {
            var col;
            tr = document.createElement('TR');
            var showDay = document.getElementById('showday-js');
            //create empty day
            for (col = 0; col <= 6; col++)//0 1 2 3 4 5 6(thứ 2 3 4 5 6 7 cn)
            {
                if (col === day)
                {
                    break;
                }

                td = document.createElement('TD');
                td.innerHTML = "";
                td.setAttribute('style', 'backgound: black');
                tr.appendChild(td);
            }
            showDay.appendChild(tr);
            var count = 1;
            for (; col <= 6; col++)
            {
                td = document.createElement('TD');
                if (count === today.getDate() && monthNow === today.getMonth() && yearNow === today.getFullYear())
                {
                    td.setAttribute('style', 'backgound-color: #00ace6');
                }

                td.innerHTML = count;
                td.onclick = choseDays;
                td.className = "days";
                tr.appendChild(td);
                count++;
            }
            var rows;
            for (rows = 2; rows <= 6; rows++) {
                tr = document.createElement('TR');
                for (col = 0; col <= 6; col++)
                {
                    if (count > totalDayOfMonth)
                    {
                        showDay.appendChild(tr);
                        return;
                    }
                    td = document.createElement('TD');
                    if (count === today.getDate() && monthNow === today.getMonth() && yearNow === today.getFullYear())
                    {
                        td.setAttribute('style', 'background-color: #00ace6');
                    }
                    td.innerHTML = count;
                    td.onclick = choseDays;
                    td.className = "days";
                    tr.appendChild(td);
                    count++;
                }
                tr.appendChild(td);
                showDay.appendChild(tr);
            }
        }
        ;
        function choseDays() {
            var choseMonth = document.getElementById("month-js");
            //var choseYear = document.getElementById("year-js");
            if (choseMonth.selectedIndex === -1)
                return null;
            choseMonth = choseMonth.options[choseMonth.selectedIndex].text;
            var chose = this.innerHTML + "/" + monthNow + "/" + yearNow;
            inputCalendar.value = chose;
            clearCalendar();
            inputCalendar.addEventListener("click", clickCalendar);
            tableCalendar.style.display = "none";
        }
        ;
        var choseYear = document.getElementById("year-js");
        choseYear.onchange = function () {
            yearNow = parseInt(this.options[this.selectedIndex].value);
            clearCalendar();
            Calendar();
        };
        var choseMonth = document.getElementById('month-js');
        choseMonth.onchange = function () {
            monthNow = parseInt(this.options[this.selectedIndex].value);
            clearCalendar();
            Calendar();
        };
    }
    ;

}
