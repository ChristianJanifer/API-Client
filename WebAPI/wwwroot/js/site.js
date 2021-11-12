//var judul = document.getElementById("judul");
//judul.style.backgroundColor = 'lightgreen';
//judul.innerHTML = "BELAJAR FROND END";


//var p = document.getElementsByTagName("p");
//for (var i = 0; i < p.length; i++) {
//    p[i].style.backgroundColor = 'darkgrey';
//}

/*document.getElementById("b").addEventListener("click", afunction);
function afunction() {
    alert("https://www.w3schools.com/");
}

$(document).ready(function () {
    $(".btn-outline-warning").click(function () {
        $(this). css("background-color", "green");
    });
});

$(document).ready(function () {
    $(".btn-outline-dark").click(function () {
        $(this).css("background-color", "red");
    });
});

$(document).ready(function () {
    $(".btn-outline-primary").click(function () {
        $("#a").css({ "font-size": "175%" });
    });
});*/

/*//POKEMON API
$.ajax({
    url: "https://pokeapi.co/api/v2/pokemon/",
    success: function (result) {
        console.log(result.results);
        var listPokemon = "";
        $.each(result.results, function (key, val) {
            listPokemon += `<tr>
                               <td>${key + 1}</td>
                               <td>${val.name}</td>
                               <td>${val.url}</td>
                               <td><button type="button" class="btn btn-primary" onclick="launchModal('${val.url}');" data-url="${val.url}" data-toggle="modal" data-target="#modalSW">
                                    Detail
                               </button></td>
                           </tr>`;
        });
        $('#listpeople').html(listPokemon);
    }
})
//POKEMON API
function launchModal(url) {
    //console.log(url);
    listSW = "";
    $.ajax({
        url: url,
        success: function (result) {
            listSW += ` <img src ='${result.sprites.other.dream_world.front_default}'class="mx-auto d-block">
                        <p style ="text-align: center" class="font-weight-bold">${result.name}</p>
                      `;

            listSW += `<p class="font-weight-bold">Ability : </p>`;
            for (i = 0; i < result.abilities.length; i++) {
                listSW += `<p> ${result.abilities[i].ability.name}</p>`;
            }
            
            listSW += `<p class="font-weight-bold">Type : </p>`;
            for (i = 0; i < result.types.length; i++) {
                listSW += `<p> ${result.types[i].type.name}</p>`;
            }

            listSW += `<p class="font-weight-bold">Height : ${result.height}</p>`;
            listSW += `<p class="font-weight-bold">Weight : ${result.weight}</p>`;
                    
            $('.modal-body').html(listSW);
        }
    });
}*/

//Using Datatable Employee
$(document).ready(function ()
{
    $('#tableEmployee').DataTable({
        'ajax': {
            'url': "https://localhost:44375/API/Employees/",
            'dataSrc': ''
        },
        'columns': [
            {
                "data": "nik"
            },
            {
                "data": "",
                "render": function (data, type, row, meta) {
                    return row['firstName'] + " " + row['lastName'];
                }
            },
            {
                "data": "phone",
                "orderable": false,
                "render": function (toFormat) {
                    var tPhone;
                    tPhone = toFormat.toString();
                    subsTphone = tPhone.substring(0, 1);
                    if (subsTphone == "0") {
                        tPhone = '(+62) ' + tPhone.substring(1, 4) + '-' + tPhone.substring(4, 8) + '-' + tPhone.substring(9, 12);
                        return tPhone
                    } else {
                        tPhone = '(+62) ' + tPhone.substring(0, 3) + '-' + tPhone.substring(4, 8) + '-' + tPhone.substring(9, 12);
                        return tPhone
                    }
                }
            },
            {
                "data": "birthDate",
                "render": function (date) {
                    var date;
                    date = date.toString();
                    dateTime = date.substring(0, 10);
                    return dateTime;
                }
            },
            {
                "data": "salary"
            },
            {
                "data": "email"
            },
            {
                "data": "gender"
            },
            {
                "data": "",
                "render": function (data, type, row, meta) {
                    var button = '<td>' +
                        '<button type="button" onclick="getNIK(' + row['nik'] + ');"  class="btn btn-primary text-center" data-toggle="modal" href="#modalEmployee"> Update </button>' + ' ' +
                        '<button type="button" onclick="deleteData(' + row['nik'] + ');" class="btn btn-success text-center"> Delete </button>' + 
                        '</td > ';
                    return button;
                }
            }
        ]
    });
});

/*//Insert Data
function insertData() {
    var obj = new Object();
    obj.NIK = $("#nik").val();
    obj.FirstName = $("#firstName").val();
    obj.LastName = $("#lastName").val();
    obj.Phone = $("#phone").val();
    obj.BirthDate = $("#birthDate").val();
    obj.Salary = $("#salary").val();
    obj.Email = $("#email").val();
    obj.Gender = $("#gender").val();
    obj.Password = $("#password").val();
    obj.Degree = $("#degree").val();
    obj.GPA = $("#gpa").val();
    obj.University_id = $("#universitas").val();
    obj.RoleId = $("#role").val();
    *//*console.log(obj);*//*

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "https://localhost:44375/API/Employees/Register",
        type: "POST",
        data: JSON.stringify(obj),
        dataType: 'json'
    }).done((result) => {
        //buat alert pemberitahuan jika success
        swal({
            title: "Good Job!",
            text: "DATA BERHASIL DITAMBAHKAN!!",
            icon: "success",
            button : "Okey",
        });
        $('#tableEmployee').DataTable().ajax.reload();
    }).fail((error) => {
    //alert pemberitahuan jika gagal
        swal({
            title: "Failed!",
            text: "DATA GAGAL DITAMBAHKAN!!",
            icon: "error",
            button: "Close",
        });
    })
}*/

$(document).ready(function () {
    // Initialize the form validation.  Now the form can only be submitted when the user has entered all required information correctly.
    $("#formEmployee").validate({
        rules: {
            nik: "required",
            firstName: "required",
            lastName: "required",
            phone: "required",
            birthDate: "required",
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 8,
            },
            gender: "required",
            salary: "required",
            degree: "required",
            gpa: "required",
            universitas: "required",
            role: "required",
        },
        // Specify validation error messages
        messages: {
            nik: "Please enter your NIK",
            firstName: "Please enter your First Name",
            lastName: "Please enter your Last Name",
            phone: "Please enter your Phone",
            birthDate: "Please enter your Birth Date",
            gender: "Please enter your Gender",
            gender: "Please enter your Gender",
            salary: "Please enter your Salary",
            degree: "Please enter your Degree",
            gpa: "Please enter your GPA",
            universitas: "Please enter your Universitas",
            role: "Please enter your Role ",
            password: {
                required: "Please provide a password",
                minlength: "Your password must be at least 8 characters long"
            },
            email: "Please enter a valid Email Address"
        },

        submitHandler: function () {
            var obj = new Object();
            obj.NIK = $('#nik').val();
            obj.FirstName = $('#firstName').val();
            obj.LastName = $('#lastName').val();
            obj.Phone = $('#phone').val();
            obj.Gender = $('#gender').val();
            obj.BirthDate = $('#birthDate').val();
            obj.Salary = $('#salary').val();
            obj.Email = $('#email').val();
            obj.Password = $('#password').val();
            obj.Degree = $('#degree').val();
            obj.GPA = $('#gpa').val();
            obj.University_Id = $('#universitas').val();
            obj.RoleId = $('#role').val();
            $.ajax({
                url: "https://localhost:44375/API/Employees/Register",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                'type': 'POST',
                'data': JSON.stringify(obj), //objek kalian
                'dataType': 'json',
            }).done((result) => {
                swal({
                    title: "Good job!",
                    text: "Data Berhasil Ditambahkan!!",
                    icon: "success",
                    button: "Okey!",
                }).then(function () {
                    window.location.reload();
                });
                $('#modalEmployee').modal('hide');
            }).fail((error) => {
                swal({
                    title: "Failed!",
                    text: "Data Gagal Dimasukan!!",
                    icon: "error",
                    button: "Close",
                });
            });
        }
    });
});

/*function resetRegister() {
    $("#formEmployee").trigger("reset");
}*/

function deleteData(NIK) {
    var ans = confirm("Are you sure you want to delete this?");
    if (ans) {
        $.ajax({
            url: "https://localhost:44375/API/Employees/" + NIK,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "DELETE",
            dataType: "json",
            data: { "": NIK },
            success: function (result) {
                swal({
                    title: "Good job!",
                    text: "DATA BERHASIL DIHAPUS!!",
                    icon: "success",
                    button: "Okey!",
                }).then(function () {
                    window.location.reload();
                });/*then(function () {
                    window.location = "https://localhost:44304/home/DataTable";
                });*/
                /*$('#tableEmployee').DataTable().ajax.reload();*/
            },
            error: function (errormessage) {
                swal({
                    title: "Failed!",
                    text: "DATA GAGAL DIHAPUS!!",
                    icon: "error",
                    button: "Close",
                });
            }
        });
    }
}


function getNIK(NIK) {
    /*console.log(nik)*/
    $.ajax({
        url: "https://localhost:44375/API/Employees/Profile/" + NIK,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            console.log(result.result)
            var tanggal = result.result.birthDate.substr(0, 10);
            $('#nik').val(result.result.nik);
            $('#firstName').val(result.result.firstName);
            $('#lastName').val(result.result.lastName);
            $('#phone').val(result.result.phone);
            $('#birthDate').val(tanggal);
            $('#salary').val(result.result.salary);
            $('#email').val(result.result.email);
            if (result.result.gender === "Male") {
                $('#gender').val(0);
            } else {
                $('#gender').val(1);
            };
            $('#password').val(result.result.password);
            $('#degree').val(result.result.degree);
            $('#gpa').val(result.result.gpa);
            $('#universitas').val(result.result.universitas);
            $('#role').val(result.result.role);
            /*$('#modalEmployee').modal('show');*/

            $(window).on('load', function () {
                $('#modalEmployee').modal('show');
            });

            $('#btnUpdate').show();
            $('#btnDaftar').hide();
            
           /* $('#hidePass').hide();
            $('#hideRow').hide();*/

        },
        error: function (errormessage) {
            /*alert(errormessage.responseText);*/
            swal({
                title: "FAILED",
                text: "DATA TIDAK DITEMUKAN!",
                icon: "error"
            });/*then(function () {
                window.location = "https://localhost:44306/home/datatable";
            });*/
        }
    });
    return false;
}

/*function scheduleRequest() {
    $('#modalEmployee').modal('show');
}*/

function updateData() {
    var nik = $('#nik');
    var obj = new Object();
    obj.NIK = $("#nik").val();
    obj.FirstName = $("#firstName").val();
    obj.LastName = $("#lastName").val();
    obj.Phone = $("#phone").val();
    obj.BirthDate = $("#birthDate").val();
    obj.Salary = $("#salary").val();
    obj.Email = $("#email").val();
    obj.Gender = $("#gender").val();
    /*console.log(obj);*/
    $.ajax({
        url: "https://localhost:44375/API/Employees/" + nik,
        data: JSON.stringify(obj),
        type: "PUT",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#nik').val("");
            $('#firstName').val("");
            $('#lastName').val("");
            $('#phone').val("");
            $('#birthDate').val("");
            $('#salary').val("");
            $('email').val("");
            $('#gender').val("");

            swal({
                title: "Good job!",
                text: "DATA BERHASIL DIUPDATE!!",
                icon: "success",
                button: "Okey!",
            }).then(function () {
                window.location.reload();
            });
            /*$('#tableEmployee').DataTable().ajax.reload();*/
            $('#modalEmployee').modal('hide');
        },
        error: function (errormessage) {
            /* alert(errormessage.responseText);*/
            swal({
                title: "Failed!",
                text: "DATA GAGAL DIHAPUS!!",
                icon: "error",
                button: "Close",
            });
        }
    });
}

/*$(function () {
    $("form[name='formEmployee']").validate({
        rules: {
            nik: {
                required: true
            },
            firstName: {
                required: true
            },
            lastName: {
                required: true
            },
            phone: {
                required: true,
                minlength: 10,
                maxlength: 13
            },
            birthDate: {
                required: true
            },
            salary: {
                required: true,
                number: true
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 8
            },
            gender: {
                required: true
            },
            universitas: {
                required: true
            },
            degree: {
                required: true
            },
            gpa: {
                required: true
            },
            role: {
                required: true
            }
        },
        messages: {
            nik: {
                required: "Please enter your NIK"
            },
            firstName: {
                required: "Please enter your first name"
            },
            lastName: {
                required: "Please enter your last name"
            },
            phone: {
                required: "Please enter your phone number",
                minlength: "Phone number should be at least 10 characters",
                maxlength: "Phone number can't be longer than 13 characters"
            },
            birthDate: {
                required: "Please enter your birthdate"
            },
            salary: {
                required: "Please enter your salary"
            },
            email: {
                required: "Please enter your email",
                email: "The email should be in the format: abc@domain.tld"
            },
            gender: {
                required: "Please choose your gender"
            },
            password: {
                required: "Please enter your password",
                minlength: "Password should be at least 8 characters",
            },
           degree: {
                required: "Please choose your degree"
            },
            gpa: {
                required: "Please enter your GPA"
            },
            universitas: {
                required: "Please choose your university"
            },
            role: {
                required: "Please choose your role"
            }
        },
        submitHandler: function () {
            form.submit();
        }
    });
});*/

/*// Initialize the form validation.  Now the form can only be submitted when the user has entered all required information correctly.
$(document).ready(function () {

    $("#formEmployee").validate({

        submitHandler: function () {
            var obj = new Object();
            obj.NIK = $("#nik").val();
            obj.FirstName = $("#firstName").val();
            obj.LastName = $("#lastName").val();
            obj.Phone = $("#phone").val();
            obj.BirthDate = $("#birthDate").val();
            obj.Salary = $("#salary").val();
            obj.Email = $("#email").val();
            obj.Gender = $("#gender").val();
            obj.Password = $("#password").val();
            obj.Degree = $("#degree").val();
            obj.GPA = $("#gpa").val();
            obj.University_id = $("#universitas").val();
            obj.RoleId = $("#role").val();
            *//*console.log(obj);*//*

            $.ajax({
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                url: "https://localhost:44375/API/Employees/Register",
                type: "POST",
                data: JSON.stringify(obj),
                dataType: 'json'
            }).done((result) => {
                //buat alert pemberitahuan jika success
                swal({
                    title: "Good Job!",
                    text: "DATA BERHASIL DITAMBAHKAN!!",
                    icon: "success",
                    button: "Okey",
                });
                $('#tableEmployee').DataTable().ajax.reload();
                $('#formModal').modal('hide');
            }).fail((error) => {
                //alert pemberitahuan jika gagal
                swal({
                    title: "Failed!",
                    text: "DATA GAGAL DITAMBAHKAN!!",
                    icon: "error",
                    button: "Close",
                });
            });
        }
    });
});*/

