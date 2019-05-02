
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
        });
    }
    function myDate() {
        var d = new Date();
        document.getElementById("birthDay").value = d.getFullYear();
    }
    myDate();
    // clear field
    function clearFields() {
        $("#codeview").val("");
        $("#name").val("");
        $("#address").val("");
        $("#phoneNumber").val("");
        $("#dateOfBirtd").val("");
        $("#AddST").hide();
    }

    // check validation 
    var checkValidate = function () {
        if ($("#codeview").val() === "" || $("#codeview").val().length > 8) {
            $("#errorCodeView").show(500);
            
        }
        if ($("#birthDay").value === null) {
            $("#errorDOB").show(500);
            
        }
        if ($("#birthDay_UD").value === null) {
            $("#errorDOB_UD").show(500);

        }
        if ($("#name").val() === "" || $("#codeview").val().length > 30) {
            $("#errorName").show(500);
           
        }
        return false;
    };
    //filter
    var flag = "active";
    //get list all students
    self.getAllStudents = function () {
        flag = "all";
        ajaxHelper(studentsUri + "?all=2" + "&name=" + $("#searchforname").val()
            + "&address=" + $("#searchforaddress").val() +
            "&birthDay=" + $("#searchforbirthday").val(), 'GET').done(function (data) {
                self.listStudents(data);
            });
        
    };
    
    //get list student active
    self.getAllStudentsCheck = function () {
        flag = "active";
        ajaxHelper(studentsUri + "?all=1&isDelete=false" + "&name=" + $("#searchforname").val() +
            "&address=" + $("#searchforaddress").val() +
            "&birthDay=" + $("#searchforbirthday").val(), 'GET')
            .done(function (data) {

                self.listStudents(data);
            });
       
    };
    self.getAllStudentsDeleted = function () {
        flag = "removed";
        ajaxHelper(studentsUri + "?all=1&isDelete=true"
            + "&name=" + $("#searchforname").val()
            + "&address=" + $("#searchforaddress").val()
            + "&birthDay=" + $("#searchforbirthday").val(), 'GET')
            .done(function (data) {

                self.listStudents(data);

            });
        
    };
    // search student
    
    //seacr for removed
    self.searchStudent = function () {
        if (flag === "all") {
            ajaxHelper(studentsUri + "?all=2" + "&name=" + $("#searchforname").val()
                + "&address=" + $("#searchforaddress").val() +
                "&birthDay=" + $("#searchforbirthday").val(), 'GET').done(function (data) {
                self.listStudents(data);
            });
        }
        else {
            if (flag === "active") {
                ajaxHelper(studentsUri + "?all=1&isDelete=false" + "&name=" + $("#searchforname").val() +
                    "&address=" + $("#searchforaddress").val() +
                    "&birthDay=" + $("#searchforbirthday").val(), 'GET')
                    .done(function (data) {

                    self.listStudents(data);
                });
            }
            else {
                ajaxHelper(studentsUri + "?all=1&isDelete=true"
                    + "&name=" + $("#searchforname").val()
                    + "&address=" + $("#searchforaddress").val()
                    + "&birthDay=" + $("#searchforbirthday").val(), 'GET')
                    .done(function (data) {

                    self.listStudents(data);
                });
            }
        }
       
    };
   

    self.newStudent = {
        id: ko.observable(),
        codeView: ko.observable(),
        name: ko.observable(),
        address: ko.observable(),
        phoneNumber: ko.observable(),
        birthDay: ko.observable(),
        genre: ko.observable(),
        classes: ko.observable(),
        isDelete: false
    };

    // add student
    self.AddStudent = function AddStudent(formElement) {
        checkValidate();
        var student = {
            codeView: self.newStudent.codeView(),
            name: self.newStudent.name(),
            address: self.newStudent.address(),
            birthDay: self.newStudent.birthDay().getDate,
            phoneNumber: self.newStudent.phoneNumber(),
            genre: self.newStudent.genre(),
            classesId: self.newStudent.classes(),
            isDelete: self.newStudent.isDelete
        };
        ajaxHelper(studentsUri, 'POST', student).done(function (item) {
            self.listStudents.push(item);
            alert("Success");
            clearFields();
            self.getAllStudentsCheck();
        });

    };
    //update student
    self.updateStudent = function () {
        var oldStudent = {
            id: $("#id").val(),
            codeView: $("#codeview").val(),
            name: $("#name").val(),
            address: $("#address").val(),
            birthDay: $("#birthDay_UD").val(),
            phoneNumber: $("#phoneNumber").val(),
            genre: $("#genre").val(),
            classesId: self.newStudent.classes()
        };
        //var student = {
        //    id: self.newStudent.id(),
        //    codeView: self.newStudent.codeView(),
        //    name: self.newStudent.name(),
        //    address: self.newStudent.address(),
        //    birthDay: self.newStudent.birthDay(),
        //    phoneNumber: self.newStudent.phoneNumber(),
        //    genre: self.newStudent.genre(),
        //    classesId: self.newStudent.classes()
        //};
        ajaxHelper(studentsUri + oldStudent.id, 'PUT', oldStudent).done(function () {
            alert("Update student success.");
            $("#UpdateForm").hide();
            $("#UpdateLB").hide();
            clearFields();
            $("#Add").show();
            self.getAllStudentsCheck();
        });
    };
    // restore student
    self.RestoreStudent = function (item) {
        var student = {
            id: item.id,
            codeView: item.codeView,
            address: item.address,
            phoneNumber: item.phoneNumber,
            genre: item.genre,
            name: item.name,
            classesId: item.classesId,
            isDelete: false
        };
        var rs = confirm("Are you sure?");

        if (rs === true) {
            ajaxHelper(studentsUri + item.id, 'PATCH', student).done(function () {
                alert("Success");
                self.getAllStudentsDeleted();
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
        var rs = confirm("Are you sure?");

        if (rs === true) {
            ajaxHelper(studentsUri + item.id, 'PUT', student).done(function () {
                alert("Success");
                self.getAllStudentsCheck();
                
            });
        }
    };
    // get data to text box when update
    self.GetDataToTB = function (item) {
        $("#add").hide();
        $("#AddST").show();
        $("#UpdateForm").show();
        $("#UpdateLB").show();
        $("#birthDay_UD").show();
        $("#birthDay").hide();
        $("#codeview").attr('disable', 'disable');
        $("#actionUpdate").show();
        $("#errorCodeView").hide();
        $("#errorDOB_UD").hide();
        $("#errorDOB").hide();
        $("#errorName").hide();
        $("#errorLoop").hide();
        $("#actionAdd").hide();

        self.newStudent.id(item.id);
        self.newStudent.codeView(item.codeView); 
        self.newStudent.name(item.name); 
        self.newStudent.address(item.address);
        self.newStudent.birthDay(item.birthDay);
        self.newStudent.phoneNumber(item.phoneNumber);
        self.newStudent.genre(item.genre);
        self.newStudent.classes(item.classesId);

    };
    // get list class
    self.listClass = ko.observableArray();
    var getAllClass = function () {
        ajaxHelper(classUri, 'GET').done(function (data) {
            self.listClass(data);
        });
    };
    getAllClass();
    
    
};

function checkValidation() {
    var codeview = document.getElementById("codeview").value;
    if (codeview.length < 5 ) {
        document.getElementById("errorCodeView").innerHTML("Please insert codeview with length is 8");
    }
    else {
        document.getElementById("errorCodeView").innerHTML("");
    }
}

//function showorhide() {
//    $("#allstudent").click(function () {
//        $("#update").show();
//        $("#hide").show();
//        $("#restore").hide();
//        $("#delete").hide();
//    });
//    $("#studentactive").click(function () {
//        $("#update").show();
//        $("#hide").show();
//        $("#restore").hide();
//        $("#delete").hide();
//    });
//    $("#studentdeleted").click(function () {
//        $("#update").hide();
//        $("#hide").hide();
//        $("#restore").show();
//        $("#delete").show();
//    });
//}
$(document).ready(function () {
    var viewModel = new ViewModels();
    viewModel.getAllStudentsCheck();
    ko.applyBindings(viewModel);

    $("#update").show();
    $("#hide").show();
    $("#restore").hide();
    $("#delete").hide();

    $("#AddST").hide();
    $("#UpdateLB").hide();
    $("#UpdateForm").hide();
    $("#showFormSearch").hide();
    

    $("#showSearch").click(function () {
        $("#showFormSearch").toggle();
    });
    $("#Add").click(function () {
        $("#AddST").show();
        $("#UpdateForm").hide();
        //$("#errorCodeView").hide();
        $("#errorLoop").hide();
        $("#actionUpdate").hide();
        $("#actionAdd").show();
        $("#birthDay_UD").hide();
        $("#birthDay").show();
        $("#errorDOB").hide();
        $("#errorDOB_UD").hide();
        $("#errorName").hide();
    });
    $("#actionCancel").click(function () {
        $("#AddST").hide();
        console.clear();
    });
   
    $("#actionCancelUD").click(function () {
        $("#UpdateLB").hide();
        $("#Add").show();
        $("#UpdateForm").hide();
    });
    $("#searchforname").change(function () {
        viewModel.searchStudent();
    });
    $("#searchforaddress").change(function () {
        viewModel.searchStudent();
    });
    $("#searchforbirthday").change(function () {
        viewModel.searchStudent();
    });
    
});
