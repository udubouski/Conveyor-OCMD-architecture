/*
@author: Весь код данной лабораторной работы полностью разработан студентом группы 521701 Дубовским В.В.
*/
"use strict"                

var m=0,p=8,t; 
var arr1 = [];
var arr2 = [];             

function addInDoc()
{
      var first = document.getElementById('first').value;
      var second = document.getElementById('second').value;

      if (isNaN(+first) || isNaN(+second) || +first > 255 || +first < 0 || +second > 255 || +second < 1 || first == "" || second == "")
      {
        alert("Ошибка ввода");
        return;
      }
      arr1.push(+first);
      arr2.push(+second);
      m++;

    var firstVector = document.getElementById('firstVector');
       if(firstVector.innerHTML == "")
       {
            firstVector.innerHTML += first;
       }
       else
       {
            firstVector.innerHTML += ", " + first;
       }

    var secondVector = document.getElementById('secondVector');
       if(secondVector.innerHTML == "")
       {
           secondVector.innerHTML += second;
       }
       else
       {
            secondVector.innerHTML += ", " + second;
       }

       document.getElementById('first').value = "";
       document.getElementById('second').value = "";
        
}

function main() 
{ 
    t = +document.getElementById('tact').value;

    if (isNaN(t) || t<1)
    {
        alert("Время выполнения такта должно быть 0 (t>0)");
        return;
    }

    if (m < 1)  {
        alert("Количество элементов в наборе не меньше (m<1)");
        return;
    }    
    createTable();
    fillTable(arr1,arr2);
    for (var i=0;i<m;i++)
    {
        arr1[i]=toBinStr(arr1[i]);
        arr2[i]=toBinStr(arr2[i]);
        restoringDivision(arr1[i],arr2[i],i);
    }


}

function toBinStr(arr)                                  //функция перевода из 10-го числа в 2-ю строку
{
    return arr.toString(2);
}

function toDec(arr)                                     //функция перевода из 2-ой строки в 10-ое число
{
    return parseInt( arr, 2 );
}


function StrtoMas(arr)                                  //функция преобразования строки в массив
{
        var mas=[];
        for (var j = 0; j < arr.length; j++)
        {
             mas[j]=arr[j];
        }
        return mas;
}

function addZero(arr)
{
    var len = p - arr.length;
    for(var i=0; i<len;i++)
    {
        arr.unshift(0);
    }
}

function createTable()                                      //функция создания таблицы
{
    var table = document.getElementById("table"); 

    for (var i = 0; i<p*4+m; i++)
    {
        var row= table.insertRow(i);
        row.setAttribute("id", "r" + i);
        for (var j =0;j<p*4+2; j++)
        {
            var cell = row.insertCell(j)
            cell.setAttribute("id", "h" + i + "w" + j);
            if (i==0)
            {
                if (j==0) cell.innerHTML = "Time";
                else if (j==33) cell.innerHTML = "Result";
                else if (j>0 && j<33)
                {
                    var act;
                    switch (j % 4) {
                        case 1:
                            act = "shift (P,A)";
                            break;
                        case 2:
                            act = "subtract B from P";
                            break;
                        case 3:
                            act = "set low-order bit in A";
                            break;
                        case 0:
                            act = "restore";
                            break;
                    }
                    cell.innerHTML = j + "<br>" + act;
                }
            }
        }

    }
}

function fillTable(arr1,arr2)                               // функция заполнения таблицы
{
    var k=0;
    for (var i = 0; i<p*4+m; i++)
    {
        for (var j =0;j<p*4+2; j++)
        {
            if (i>0 && j==0 && k<m)
            {
                var cell = document.getElementById("h" + i + "w" + j);
                cell.innerHTML = "Pair " + i+ ":"+arr1[k] + "/" + arr2[k] + "<br>" + "Time " + t*i;
                k++;
            }
            else if (i>0 && j==0 && k>=m) 
                {
                    var cell = document.getElementById("h" + i + "w" + j);
                    cell.innerHTML = "Time " + i*t;
                }
        }
    }
}   

function shift(masP,masA)                                           //функция сдвига на 1 бит
{
    masP.shift();
    masP.push(masA.shift());
}

function subtract(masP,masB)                                        //функция вычитания 
{
    var masO = [];
    var b = false;
    for (var i=masP.length-1;i>0;i--)
    {
        if (masP[i]==0 && masB[i]==0)
        {
            masO[i]=0;
        }
        else if (masP[i]==1 && masB[i]==1)
        {
            masO[i]=0;
        }
        else if (masP[i]==1 && masB[i]==0)
        {
            masO[i]=1;
        }
        else if (masP[i]==0 && masB[i]==1)
        {
            masO[i]=1;
            b=true;
        }
        else if (masP[i]==0 && masB[i]==0 && b==true)
        {
            masO[i]=0;
        }
        else if (masP[i]==1 && masB[i]==1 && b==true)
        {
            masO[i]=1;
        }
        else if (masP[i]==1 && masB[i]==0 && b==true)
        {
            masO[i]=0;
            b=false;
        }
        else if (masP[i]==0 && masB[i]==1 && b==true)
        {
            masO[i]=1;
        }
    }
    if (b==true) masO[0]=1;
    else if (b==false) masO[0]=0;
    return masO;
}

function registerP(arr)                                         //функция разделения массива P
{
    var mas1=[];
    var mas2=[]
    for(var i=1;i<5;i++)
    {
        mas1[i-1]=arr[i];
    }
    for(var i=5;i<9;i++)
    {
        mas2[i-5]=arr[i];
    }
    return (String(arr[0])+"."+mas1.join("")+"."+mas2.join(""));
}

function registerA(arr)                                         //функция разделения массива A
{
    var mas1=[];
    var mas2=[]
    for(var i=0;i<arr.length-4;i++)
    {
        mas1[i]=arr[i];
    }
    var k=0;
    for(var i=arr.length-4;i<arr.length;i++)
    {
        mas2[k]=arr[i];
        k++;
    }
    return (mas1.join("")+"."+mas2.join(""));
}


function restoringDivision(arr1,arr2,index)                        //функция вычисления целочисленного частного пары 8-разрядных чисел делением с восстановлением частичного остатка
{
    var P="000000000"
    P=StrtoMas(P);

    var A=StrtoMas(arr1);
    addZero(A);

    var B=StrtoMas(arr2);
    addZero(B);
    B.unshift(0);

    var i=index+1,j=1;
    for (var d = 0; d<p; d++)
    {
            var cell = document.getElementById("h" + i + "w" + j);
            // 1 - сдвиг
            shift(P,A);
            cell.innerHTML="P:"+registerP(P)+"<br>"+"A:"+registerA(A);
            i++;j++;
            // 2 - вычитание
            cell = document.getElementById("h" + i + "w" + j);
            var O=subtract(P,B);
            cell.innerHTML="P:"+registerP(O)+"<br>"+"A:"+registerA(A);
            i++;j++;
            // 3- установка младшего бита
            cell = document.getElementById("h" + i + "w" + j);
            if (O[0]==1) A.push(0);
            else A.push(1);
            cell.innerHTML="P:"+registerP(O)+"<br>"+"A:"+registerA(A);
            i++;j++;
            // 4 - восстановление остатка
            cell = document.getElementById("h" + i + "w" + j);
            if (O[0]==0) P=O;
            cell.innerHTML="P:"+registerP(P)+"<br>"+"A:"+registerA(A);
            i++;j++; 
    }
    
    i--;
    var cell = document.getElementById("h" + i + "w" + j);
    cell.innerHTML = "Remainder:"+toDec(P.join(''))+"<br>"+"Quotient:"+toDec(A.join(''));

    var resultVector = document.getElementById('resultVector');
    if(resultVector.innerHTML == "")
    {
        resultVector.innerHTML += toDec(A.join(''));
    }
    else
    {
        resultVector.innerHTML += ", " + toDec(A.join(''));
    }
}
