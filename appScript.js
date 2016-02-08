/**
 * Created by lakshmi on 1/18/16.
 */

angular.module("myApp",[])
 .controller("myCtrl", function($scope){
       // $scope.test = "hello from  controller";

        $scope.printToExcel = function(){
            var blob = new Blob([document.getElementById('table').innerHTML], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
            });
            saveAs(blob, "Report.xls");
        }

       $scope.printPdfDynamic= function(){
           var columns = ["First Name", "Last Name", "ID"];

           var myTable=document.getElementById("myTable");

           console.log(myTable);
           var myData=[]
           for (var r = 0, n = myTable.rows.length; r < n; r++) {
               for (var c = 0, m = myTable.rows[r].cells.length; c < m; c++) {
                   myData.push(myTable.rows[r].cells[c].innerHTML);
               }
           }
           console.log("myData",myData);

           var result =[];
           var row=[]
           var i =0;
          while(i<=myData.length){
              i=0;
               for(var j=i; j<3;j++){
                   row.push(myData[i]);
                   console.log(myData[i])

                   console.log(row);
                   i++;
               }
               console.log(i)
              result.push(row);
              //console.log(result);
              row=[];
               myData.splice(0,3);
              // console.log(myData)

           }
           console.log(result);

           var doc = new jsPDF('p', 'pt');
           doc.autoTable(columns, result);
           doc.save("table.pdf");
        }

        /*$scope.printPdfDynamic = function () {


            var pdf = new jsPDF('p', 'pt', 'letter');

            source = $('#table')[0];

            specialElementHandlers = {
                // element with id of "bypass" - jQuery style selector
                '#bypassme': function (element, renderer) {
                    // true = "handled elsewhere, bypass text extraction"
                    return true
                }
            };

            margins = {
                top: 80,
                bottom: 60,
                left: 40,
                width: 522
            };

            pdf.fromHTML(
                source, // HTML string or DOM elem ref.
                margins.left, // x coord
                margins.top, { // y coord
                    'width': margins.width, // max width of content on PDF
                    'elementHandlers': specialElementHandlers
                },

                function (dispose) {
                    // dispose: object with X, Y of the last line add to the PDF
                    //          this allow the insertion of new lines after html
                    pdf.save('Test.pdf');
                }, margins);
        }*/


    })
    .directive('myTable', function() {
        return {
            templateUrl: 'my-table.html'
        };
    });

