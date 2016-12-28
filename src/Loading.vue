<template>
    <div>
        <div id="text-container">
            <p id="text" class="center"></p>
            <hr id="line" style="width: 30px;"/>
        </div>
        <div id="wait-container">
            <div id="triangle" class="center blink"></div>
            <div id="spinner" class="hidden">
                <div id="left" class="circle blink"></div>
                <div id="right" class="circle blink3"></div>
                <div id="center" class="circle blink2"></div>
            </div>
        </div>
    </div>
</template>

<style>
    /*
    This file is part of Samaritan.
    Samaritan is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    Samaritan is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    You should have received a copy of the GNU General Public License
    along with Samaritan. If not, see <http://www.gnu.org/licenses/>.
*/
    /*
    @font-face {
        font-family: magdacleanmono-bold;
        src: url(assets/fonts/magdacleanmono-bold.ttf);
    }
    */

    body {
        width: 100%;
        height: 100%;
        position: fixed;
        margin: 0;
    }

    body, html {
        background-color: white;
        background: -moz-radial-gradient(center, ellipse cover, #FFFFFF 0%, #FFFFFF 58%, #b6b6b6 100%, #b6b6b6 100%); /* ff3.6+ */
        background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%, #FFFFFF), color-stop(58%, #FFFFFF), color-stop(100%, #b6b6b6), color-stop(100%, #b6b6b6)); /* safari4+,chrome */
        background: -webkit-radial-gradient(center, ellipse cover, #FFFFFF 0%, #FFFFFF 58%, #b6b6b6 100%, #b6b6b6 100%); /* safari5.1+,chrome10+ */
        background: -o-radial-gradient(center, ellipse cover, #FFFFFF 0%, #FFFFFF 58%, #b6b6b6 100%, #b6b6b6 100%); /* opera 11.10+ */
        background: -ms-radial-gradient(center, ellipse cover, #FFFFFF 0%, #FFFFFF 58%, #b6b6b6 100%, #b6b6b6 100%); /* ie10+ */
        background: radial-gradient(ellipse at center, #FFFFFF 0%, #FFFFFF 58%, #b6b6b6 100%, #b6b6b6 100%); /* w3c */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#FFFFFF', endColorstr='#b6b6b6',GradientType=1 ); /* ie6-9 */

    }

    #triangle {
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 10px 17px 10px;
        border-color: transparent transparent #fe2d2d transparent;
    }

    #line {
        border-top: 1px solid black;
        border-bottom: 1px solid black;
        margin-top: 0;
    }

    #text{
        font-family: "magdacleanmono-bold", serif;
        font-size: 32px;
        text-transform: uppercase;
        margin-bottom: 0;
    }

    #text-container {
        position: absolute;
        display: block;
        width: 100%;
        bottom: 50%;
    }

    #wait-container {
        position: absolute;
        display: block;
        width: 100%;
        top: 50%;
        vertical-align: top;
    }

    .center {
        display: block;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
    }

    .circle {
        background-color: black;
        border-radius: 50%;
        width: 7px;
        height: 7px;
        margin-right: 2px;
        margin-left: 2px;
    }

    #spinner {
        width: 30px;
        margin-right: auto;
        margin-left: auto;
    }

    #left{
        float:left;
    }

    #right{
        float:right;
    }

    #center{
        margin:0 auto;
    }

    .hidden {
        display: none !important;
    }
</style>

<script>
    /*
     This file is part of Samaritan.
     Samaritan is free software: you can redistribute it and/or modify
     it under the terms of the GNU General Public License as published by
     the Free Software Foundation, either version 3 of the License, or
     (at your option) any later version.
     Samaritan is distributed in the hope that it will be useful,
     but WITHOUT ANY WARRANTY; without even the implied warranty of
     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
     GNU General Public License for more details.
     You should have received a copy of the GNU General Public License
     along with Samaritan. If not, see <http://www.gnu.org/licenses/>.
     */

    wordTime = 750;
    thinkTime = 1750;
    lengthMin = 1;
    lengthMax = 3;
    completeMax = 4;
    font = '32px magdacleanmono-bold';
    chance = 0.5;
    smoothIncrement = 10;

    function blink() {
        $('.blink').fadeOut(750).fadeIn(750);
    }

    function blink2() {
        $('.blink2').fadeOut(750).fadeIn(750);
    }

    function blink3() {
        $('.blink3').fadeOut(750).fadeIn(750);
    }

    function setSpinner(){
        $('#triangle').addClass('hidden');
        $('#spinner').removeClass('hidden');
    }

    function setTriangle(){
        $('#spinner').addClass('hidden');
        $('#triangle').removeClass('hidden');
    }


    function getParameter(param) {
        var pageURL = decodeURIComponent(window.location.search.substring(1)),
            urlVariables = pageURL.split('&'),
            parameterName,
            i;

        for (i = 0; i < urlVariables.length; i++) {
            parameterName = urlVariables[i].split('=');

            if (parameterName[0] === param) {
                return parameterName[1] === undefined ? true : parameterName[1];
            }
        }
    }

    function getTextWidth(text, font) {
        var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
        var context = canvas.getContext("2d");
        context.font = font;
        var metrics = context.measureText(text);
        return metrics.width;
    }

    function nextText(array , index , changeOffset){
        if(array == undefined)return;
        setTimeout(function(){
            if(index == array.length)setWord('' , false , true ,true);
            else{
                var text = array[index];
                var c = text.length <= lengthMax && text.length > lengthMin;
                changeOffset = changeOffset || c;
                if(index == 0){
                    setScrambled(text ,changeOffset, function(){
                        nextText(array , index+1 , c);
                    });
                }else{
                    setWord(text , changeOffset , true , true);
                    nextText(array , index+1 , c);
                }
            }
        }, wordTime);
    }

    function changeTextOffset(word){
        if(word.length == 0)removeTextOffset();
        else $('#text-container')
            .attr('style' , 'margin-left: ' + getTextWidth(word.substring(0 , lengthMax+1), font)/2 + 'px');
    }

    function removeTextOffset(){
        $('#text-container').removeAttr('style');
    }

    function setText(phrase){
        if(phrase == undefined)return;
        nextText(phrase.split(' ') , 0 , false);
    }

    function setWord(word , changeOffset , changeSize , smooth){
        removeTextOffset();
        if(changeOffset)changeTextOffset(word);

        var text = $('#text');
        var oldWord = text.text();
        text.text(word);
        var size = word == '' ? 30 : getTextWidth(word , font);
        if(changeSize)
            if(smooth)smoothLineSize(size,oldWord == '' ? 30 : getTextWidth(oldWord , font));
            else $('#line').attr('style' , 'width: '+ size +'px;');
    }

    function smoothLineSize(size , oldSize){
        console.log('e' + size + ' ' + oldSize);
        var i = oldSize;
        var line = $('#line');
        var id = setInterval(function () {
            console.log(i);
            if(size>oldSize?size<=i+smoothIncrement: size>=i+smoothIncrement){
                line.attr('style' , 'width: '+ size +'px;');
                clearInterval(id);
                return;
            }
            line.attr('style' , 'width: '+ i +'px;');
            i = size>oldSize ? i+smoothIncrement : i-smoothIncrement;
        } , 1);
    }


    function randomChar(){
        return String.fromCharCode(35 + Math.random()*91);
    }

    function randomText(length){
        var text = "";

        for( var i=0; i < length; i++)
            text += randomChar();

        return text;
    }

    function setScrambled(originalText , changeOffset , onComplete){
        var complete = 0;
        var tmpText = randomText(originalText.length);
        var first = true;
        var id = setInterval(function () {
            for(var i = 0; i < originalText.length ; i++){
                if(originalText.charAt(i) != tmpText.charAt(i)){
                    if(Math.random()<chance && complete > completeMax){
                        tmpText = tmpText.substring(0 , i)+originalText.charAt(i)+tmpText.substring(i+1);
                        complete = 0;
                    } else {
                        tmpText = tmpText.substring(0 , i)+randomText(1)+tmpText.substring(i+1);
                        complete++;
                    }
                }
            }
            setWord(tmpText , changeOffset , first , first);
            first = false;
            if(tmpText == originalText){
                clearInterval(id);
                onComplete();
            }

        } , 15);
    }

    var phrases = [
        "Initialisation de RustLang",
        "Destruction de DirectX"
    ]


    $( document ).ready(function (){
        setInterval(blink,500);
        setTimeout(function(){setInterval(blink2, 500)}, 500);
        setTimeout(function(){setInterval(blink3, 500)}, 1000);

        let i = Math.floor((Math.random() * phrases.length) + 1);
        setText(phrases[i - 1]);

        setTimeout(function ()
        {
            document.location.href="/home"
        }, 3000);
    });

</script>