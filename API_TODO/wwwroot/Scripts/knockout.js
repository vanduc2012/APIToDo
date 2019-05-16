
var ViewModels = function () {
    var self = this;
    self.listStudents = ko.observableArray([]);
    self.error = ko.observable();
    self.id = ko.observable();
    self.codeView = ko.observable();
    self.name = ko.observable();
    self.address = ko.observable();
    self.birthDay = ko.observable();
    self.phoneNumber = ko.observable();
    self.genre = ko.observable();
    self.isDelete = ko.observable();
    self.classesId = ko.observable();
    self.classes = ko.observableArray();


    //uri to api
    var studentsUri = '/api/students/';
    var classUri = '/api/classes/';

    // function excute api
    function ajaxHelper(uri, method, data) {
        self.error(''); //clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null
        }).fail(function (jqXHR, textStatus, errorThrown) {
            self.error(errorThrown);
            alert("Something went wrong.");
        });
    }




    //filter
    var flag = "active";
    //get list all students
    self.getAllStudents = function () {
        flag = "all";
        ajaxHelper(studentsUri + "?all=2&name=" + $("#searchingAll").val() + "&address=" + $("#searchingAll").val(), 'GET').done(function (data) {
            self.listStudents(data);
            $(".hideBT").remove();
            $(".restoreBT").remove();

        });

    };

    //get list student active
    self.getAllStudentsCheck = function () {
        flag = "active";
        ajaxHelper(studentsUri + "?all=1&isDelete=false&name=" + $("#searchingAll").val() + "&address=" + $("#searchingAll").val(), 'GET')
            .done(function (data) {

                self.listStudents(data);
                $(".restoreBT").remove();
            });

    };

    //self.getAllStudentsCheck();
    self.getAllStudentsDeleted = function () {
        flag = "removed";
        ajaxHelper(studentsUri + "?all=1&isDelete=true&name=" + $("#searchingAll").val() + "&address=" + $("#searchingAll").val(), 'GET')
            .done(function (data) {

                self.listStudents(data);
                $(".updateBT").remove();
                $(".hideBT").remove();
            });

    };
    // search student

    //seacr for removed
    self.searchStudent = function () {
        if (flag === "all") {
            ajaxHelper(studentsUri + "?all=2&name=" + $("#searchingAll").val() + "&address=" + $("#searchingAll").val(), 'GET').done(function (data) {
                self.listStudents(data);
            });
        }
        else {
            if (flag === "active") {
                ajaxHelper(studentsUri + "?all=1&isDelete=false&name=" + $("#searchingAll").val() +"&address=" + $("#searchingAll").val(), 'GET').done(function (data) {

                    self.listStudents(data);
                });
            }
            else {
                ajaxHelper(studentsUri + "?all=1&isDelete=true&name=" + $("#searchingAll").val() + "&address=" + $("#searchingAll").val(), 'GET')
                    .done(function (data) {

                        self.listStudents(data);
                    });
            }
        }

    };


    $("#searchingAll").on("keyup", function () {
        self.searchStudent();
    });
    
    self.newStudent = {
        id: ko.observable(),
        codeView: ko.observable(),
        name: ko.observable(),
        address: ko.observable(),
        phoneNumber: ko.observable(),
        birthDay: ko.observable(),
        genre: ko.observable(),
        classes: ko.observable(),
        isDelete: ko.observable()
    };

    // reset textbox to add new student

    self.reSet = function reSet() {
        self.newStudent.id('');
        self.newStudent.codeView('');
        self.newStudent.name('');
        self.newStudent.address('');
        self.newStudent.birthDay(new Date());
        self.newStudent.phone = "";
        self.newStudent.genre("Nam");
        self.newStudent.classes(1);
        document.getElementById("errPhone").innerHTML = "";
        document.getElementById("errCodeView").innerHTML = "";
    };

    // add student
    self.AddStudent = function AddStudent(formElement) {

        var student = {
            codeView: self.newStudent.codeView(),
            name: self.newStudent.name(),
            address: self.newStudent.address(),
            birthDay: self.newStudent.birthDay(),
            phoneNumber: self.newStudent.phoneNumber(),
            genre: self.newStudent.genre(),
            classesId: self.newStudent.classes(),
            isDelete: false
        };
        ajaxHelper(studentsUri, 'POST', student).done(function (item) {
            self.listStudents.push(item);
            alert("Success");
            $("#AddNewStudent").modal('hide');
            self.reSet();
            self.getAllStudentsCheck();
        });

    };
    // get data to textbox when update
    self.GetDataToTB = function (item) {

        self.newStudent.id(item.id);
        self.newStudent.codeView(item.codeView);
        self.newStudent.name(item.name);
        self.newStudent.address(item.address);
        self.newStudent.birthDay(CatChuoiDate(item.birthDay));
        self.newStudent.phoneNumber(item.phoneNumber);
        self.newStudent.genre(item.genre);
        self.newStudent.classes(item.classesId);
        self.newStudent.isDelete(item.isDelete);
    };
    //update student
    self.updateStudent = function () {

        var student = {
            id: self.newStudent.id(),
            codeView: self.newStudent.codeView(),
            name: self.newStudent.name(),
            address: self.newStudent.address(),
            birthDay: self.newStudent.birthDay(),
            phoneNumber: self.newStudent.phoneNumber(),
            genre: self.newStudent.genre(),
            classesId: self.newStudent.classes(),
            isDelete: self.newStudent.isDelete() === 'true' ? true : false
        };
        console.log(student.isDelete);
        ajaxHelper(studentsUri + student.id, 'PUT', student).done(function () {
            alert("Update student success.");
            $("#AddNewStudent").modal('hide');
            self.getAllStudentsCheck();
        });
    };
    // restore student
    self.RestoreStudent = function (item) {
        var student = {
            id: item.id,
            codeView: item.codeView,
            address: item.address,
            birthDay: item.birthDay,
            phoneNumber: item.phoneNumber,
            genre: item.genre,
            name: item.name,
            classesId: item.classesId,
            isDelete: false
        };
        var rs = confirm("Are you sure?");

        if (rs === true) {
            console.log(student.isDelete);
            ajaxHelper(studentsUri + item.id, 'PUT', student).done(function () {
                alert("Success");
                self.getAllStudentsDeleted();
            }).fail(function () {
                alert("Something went wrong.");
            });
        }

    };
    //delete 
    self.DeleteStudent = function (item) {
        var rs = confirm("Are you sure?");
        if (rs === true) {
            ajaxHelper(studentsUri + item.id, 'DELETE').done(function () {
                alert("Success");
                self.listStudents.remove(item);
                self.getAllStudentsCheck();
            });
        }

    };
    //hide student
    self.HideStudent = function (item) {
        var student = {

            id: item.id,
            codeView: item.codeView,
            address: item.address,
            phoneNumber: item.phoneNumber,
            genre: item.genre,
            name: item.name,
            classesId: item.classesId,
            isDelete: true
        };
        ajaxHelper(studentsUri + item.id, 'PUT', student).done(function () {
            // alert("Success");
            self.getAllStudentsCheck();

        });
    };


    // get list class

    var getAllClass = function () {
        ajaxHelper(classUri, 'GET').done(function (data) {
            self.classes(data);
        });
    };


    getAllClass();
    self.Classname = ko.observable();
    self.getClassById = function (idCL) {

        ajaxHelper(classUri + idCL, 'GET').done(function (data) {

            alert(data.name);
            return data.name;
        });
    };
    //self.getClassById();

    self.deleteCheckbox = function () {
        var rs = confirm("are you sure?");
        if (rs) {
            $("#mytable input[type=checkbox]:checked").each(function () {
                var row = $(this).closest("tr")[0];
                console.log(row);
                var message = row.cells[0];
                console.log(message);
                var stId = $(message).html();
                ajaxHelper(studentsUri + stId, 'DELETE').done(function () {

                });
            });
            alert("Success");
            self.getAllStudentsCheck();
        }
    };
};



function showhide() {

    $("#Codeview").attr("disabled", 'disabled');
    $("#AddNewStudentLabel").hide();
    $("#UpdateStudentLabel").show();
    $("#btnAdd").hide();
    $("#btnUpdate").show();
    document.getElementById('isDelete').style.display = "inline-block";
    
}
function showSubmit() {
    $("#Codeview").removeAttr("disabled", "disabled");
    $("#AddNewStudentLabel").show();
    $("#UpdateStudentLabel").hide();
    $("#btnAdd").show();
    $("#btnUpdate").hide();
    document.getElementById("isDelete").style.display = "none";
}

function showBtnCheckbox() {
    var checkallcheckbox = document.getElementById('checkall');
   
    if (!showcheck()) {
        document.getElementById("deletecheck").style.display = "none";
        checkallcheckbox.checked = false;
    }
    else {
        document.getElementById("deletecheck").style.display = "inline-block";
        checkallcheckbox.checked = true;
    }
}
function showcheck() {
    var checkboxes = document.getElementsByName('check');
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            return true;
        }
        else {
            return false;
        }
    }
    return false;
}

//check all checkbox
function CheckAll() {
    var checkall = document.getElementById('checkall');
    var checkboxs = document.getElementsByName('check');
   
    if (checkall.checked) {
        for (var i = 0; i < checkboxs.length; i++) {
            checkboxs[i].checked = true;
            document.getElementById("deletecheck").style.display = "inline-block";
        }
    }
    else {
        for (var j = 0; j < checkboxs.length; j++) {
            checkboxs[j].checked = false;
            document.getElementById("deletecheck").style.display = "none";
        }
    }
    
}

function FormatName() {
    var space = " ";
    var start = 0;
    var end = 0;
    var Name = $("#Name").val();
    console.log(Name);
    for (var i = 0; i < Name.length; i++) {
        end = Name.indexOf(space);
        console.log(end);
        
        var Fm = Name.substring(start, end);
        console.log(Fm);
        start = end;
    }
    
    
}
//validate phone
function checkPhone() {
    var phone = document.getElementById("Phone").value;
    if (phone.length > 11) {
        document.getElementById("errPhone").innerHTML = 'Maxlength is 11 char.';
    }

    else {
        if (phone.length < 10) {
            document.getElementById("errPhone").innerHTML = 'Minlength is 10 char.';
        }
        else
            document.getElementById("errPhone").innerHTML = 'OK';
    }
};
//validate codeview
function checkCodeview() {
    var CodeView = document.getElementById("Codeview").value;
    if (CodeView.length !== 8) {
        document.getElementById("errCodeView").innerHTML = 'Codeview with length is 8 char.';
    }
    else {
        document.getElementById("errCodeView").innerHTML = 'OK';
    }
};

function CatChuoiDate(da) {
    var date = new Date(da);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    if (year < 10) {
        year = "000" + year;
    }
    if (year < 100) {
        year = "00" + year;
    }
    if (year < 1000) {
        year = "0" + year;
    }
    var d = year + "-" + month + "-" + day;
    return d;

} function CatChuoiDate1(da) {
    var date = new Date(da);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    
    var d = month + "/" + day + "/" + year;
    return d;

}

$(document).ready(function () {
    var VM = new ViewModels();
    VM.getAllStudentsCheck();

    ko.applyBindings(VM);
    document.getElementById("deletecheck").style.display = "none";


    $('li.nav-item').click(function () {
        $('li.nav-item').removeClass('active');
        $(this).addClass('active');
    });
   
});

