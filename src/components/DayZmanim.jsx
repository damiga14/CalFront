import React, { useEffect, useState } from 'react'

function DayZmanim() {
    let [calStructureHebrew, setCalStructureHebrew] = useState([])

    function myZmanimCall(callBack) {
        let date = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) { callBack(xmlhttp.responseText); }
        }
        xmlhttp.open("POST", 'https://api.myzmanim.com/engine1.json.aspx/getDay', true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send(`coding=JS&language=en&locationid=43945191&inputdate=${date}&key=61be5e5d2f3cd6228cac8adfc97f8786b53c2d01992068b9f1f697bc2763188f5daa8b4d9d34922c&user=0013329078`);
        
        // USER: 0013329078
        // KEY: 61be5e5d2f3cd6228cac8adfc97f8786b53c2d01992068b9f1f697bc2763188f5daa8b4d9d34922c
    }

    function myZmanimCall_callback(response) {
        var day = JSON.parse(response);
        calStructureHebrew.push(day)
    }

    useEffect(() => {
        myZmanimCall(myZmanimCall_callback)
    }, [])

    return (
        <>
            <p>Today's Zmanim</p>

{/* {calStructureHebrew[0].Time.DateJewishLong} */}


            {console.log(calStructureHebrew)}

        </>
    )
}

export default DayZmanim