//Using Datatable Employee
$(document).ready(function ()
{
    $('#tableEmployee').DataTable({
        /*dom: 'Bfrtip',*/
        'ajax': {
            'url': "/Employees/GetEmployees/",
            'order': [[0, 'asc']],
            'dataSrc': ''
        },
        'buttons': [
        {
            extend: 'excelHtml5',
            name: 'excel',
            title: 'Employee',
            sheetName: 'Employee',
            text: '',
            className: 'buttonHide fa fa-download btn-default',
            filename: 'Data',
            autoFilter: true,
            exportOptions: {
                columns: [1, 2, 3, 4, 5, 6]
            }
        },
        {
            extend: 'pdfHtml5',
            name: 'pdf',
            title: 'Employee',
            sheetName: 'Employee',
            text: '',
            className: 'buttonHide fa fa-download btn-default',
            filename: 'Data',
            autoFilter: true,
            exportOptions: {
                columns: [1, 2, 3, 4, 5, 6]
            }
        }],
        'columns': [
            {
                data: 'no', name: 'id', render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                }
            },
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
                "data": "salary",
                 "render": function (data, type, row) {
                     return "Rp. " + row['salary'];
                 }
            },
            {
                "data": "email"
            },
            {
                "data": "gender",
                "render": function (data, type, row, meta) {
                    if (row['gender'] == 0) {
                        return 'Male'
                    } else if (row['gender'] == 1) {
                        return 'Female'
                    }
                }
            },
            {
                "data": " ",
                "render": function (data, type, row, meta) {
                    var button = '<td>' +
                        '<button type="button" onclick="getNIK(' + row['nik'] + ');"  class="btn btn-primary text-center" data-toggle="modal" href="#modalEmployee"><i class="fa fa-edit"></i></button>' + ' ' +
                        '<button type="button" onclick="deleteData(' + row['nik'] + ');" class="btn btn-danger text-center"><i class="fa fa-trash"></i></button>' +
                        '</td > ';
                    return button;
                }
            }
        ]
    });
});

//Export To Excel
function exportExcel() {
    var dataTableEmployee = $('#tableEmployee').DataTable();
    dataTableEmployee.buttons('excel:name').trigger();
};

//Export To PDF
function exportPdf() {
    var dataTableEmployee = $('#tableEmployee').DataTable();
    dataTableEmployee.buttons('pdf:name').trigger();
};

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
                url: "/Employees/Register",
                /*headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },*/
                'type': 'POST',
                'data': { entity: obj }, //objek kalian
                'dataType': 'json',
            }).done((result) => {
                if (result == 200) {
                    swal({
                        title: "Good job!",
                        text: "Data Berhasil Ditambahkan!!",
                        icon: "success",
                        button: "Okey!",
                    }).then(function () {
                        window.location.reload();
                    });
                    $('#modalEmployee').modal('hide');
                } else if (result == 400) {
                    swal({
                        title: "Failed!",
                        text: "Data Gagal Dimasukan!!",
                        icon: "error",
                        button: "Close",
                    });
                }
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

//Fungsi Delete Data Berdasarkan NIK
function deleteData(NIK) {
    /*console.log(nik);*/
    swal({
        title: "Are you sure?",
        text: "Hapus Data Ini !!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    url: "/Employees/Delete/" + NIK,
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
                        });
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
            } else {
                swal("DATA GAGAL DIHAPUS!!");
            }
        });
}

//Fungsi Dapat Data Berdasarkan NIK
function getNIK(NIK) {
    //console.log(nik)
    $.ajax({
        url: "/Employees/Get/" +  NIK,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            console.log(result)
            var tanggal = result.birthDate.substr(0, 10);
            $('#nik').val(result.nik);
            $('#firstName').val(result.firstName);
            $('#lastName').val(result.lastName);
            $('#phone').val(result.phone);
            $('#birthDate').val(tanggal);
            $('#salary').val(result.salary);
            $('#email').val(result.email);

            if (result.gender === 0) {
                $('#gender').val(0);
            } else {
                $('#gender').val(1);
            };
            $('#password').val(result.password);
            $('#degree').val(result.degree);
            $('#gpa').val(result.gpa);
            $('#universitas').val(result.universitas);
            $('#role').val(result.role);
         
            //$('#modalEmployee').modal('show');

            $(window).on('load', function () {
                $('#modalEmployee').modal('show');
            });

            $('#btnUpdate').show();
            $('#btnDaftar').hide();
        },
        error: function (errormessage) {
            swal({
                title: "FAILED",
                text: "DATA TIDAK DITEMUKAN!",
                icon: "error"
            });
        }
    });
    return false;
}

//Fungsi Update Data
function updateData() {
    var nik = $('#nik').val();
    var obj = new Object();
    obj.NIK = $("#nik").val();
    obj.FirstName = $("#firstName").val();
    obj.LastName = $("#lastName").val();
    obj.Phone = $("#phone").val();
    obj.BirthDate = $("#birthDate").val();
    obj.Salary = $("#salary").val();
    obj.Email = $("#email").val();
    obj.Password = $('#password').val();
    obj.Gender = $("#gender").val();
    obj.Degree = $('#degree').val();
    obj.GPA = $('#gpa').val();
    obj.University_Id = $('#universitas').val();
    obj.RoleId = $('#role').val();
    console.log(obj);
    $.ajax({
        url: "/Employees/Put/" + nik,
        type: "PUT",
        data: { id: nik, entity: obj },/*,
        contentType: "application/json;charset=utf-8",
        dataType: "json",*/
        success: function (result) {
            $('#nik').val("");
            $('#firstName').val("");
            $('#lastName').val("");
            $('#phone').val("");
            $('#birthDate').val("");
            $('#salary').val("");
            $('#email').val("");
            $('#password').val("");
            $('#gender').val("");
            $('#degree').val("");
            $('#gpa').val("");
            $('#universitas').val("");
            $('#role').val("");
            swal({
                title: "Good job!",
                text: "DATA BERHASIL DIUPDATE!!",
                icon: "success",
                button: "Okey!",
            }).then(function () {
                window.location.reload();
            });
            /*$('#tableEmployee').DataTable().ajax.reload();*/
            //$('#modalEmployee').modal.hide();
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

/*$.ajax({
    url: "https://localhost:44375/API/Universities",
    success: function (result) {
        var optionUniv = `<option value = ""> ---Choose University---</option>`;
        $.each(result, function (key, val) {
            optionUniv += `
                            <option value = "${val.id}">${val.name}</option`;
        });
        $('$universitas').html(optionUniv);
    }
})*/

//ApexChart Gender
$(document).ready(function () {
    $.ajax({
        url: "https://localhost:44375/API/Employees/Gender",
        success: function (result) {
            //console.log(result);
            var label = [];
            var series = [];
            $.each(result.result, function (key, val) {
                series.push(val.value);
                if (val.gender === 0) {
                    label.push("Male");
                } else {
                    label.push("Female");
                }
            });
            var options = {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: 'Gender',
                    align: 'Center'
                },
                series: series,
                labels: label,
            }
            var chart = new ApexCharts(document.querySelector("#chart"), options);
            chart.render();
        }
    });
});

//ApexChart Role
$(document).ready(function () {
    $.ajax({
        url: "https://localhost:44375/API/Employees/Role",
        success: function (result) {
            //console.log(result);
            var label = [];
            var series = [];

            $.each(result.result, function (key, val) {
                //console.log(result.val);
                series.push(val.value);
                if (val.roleId === 1) {
                    label.push("Employee");
                } else if (val.roleId === 2) {
                    label.push("Manager");
                } else {
                    label.push("Director");
                }
            });
            var options = {
                chart: {
                    type: 'donut'
                },
                title: {
                    text: 'Role',
                    align: 'Center'
                },
                series: series,
                labels: label
            }
            var chart = new ApexCharts(document.querySelector("#chart1"), options);
            chart.render();
        }
    });
});

//ApexChart Degree
$(document).ready(function () {
    $.ajax({
        url: "https://localhost:44375/API/Employees/Degree",
        success: function (result) {
            //console.log(result);
            var label = [];
            var series = [];
            $.each(result.result, function (key, val) {
                series.push(val.value);
                label.push(val.degree);
            });
            var options = {
                chart: {
                    height: 280,
                    type: "area"
                },
                title: {
                    text: 'Degree',
                    align: 'Center'
                },
                dataLabels: {
                    enabled: false
                },
                markers: {
                    size: 5,
                    colors: ["#000524"],
                    strokeColor: "#00BAEC",
                    strokeWidth: 3
                },
                series: [
                    {
                        name: "Value",
                        data: series
                    }
                ],
                fill: {
                    type: "gradient",
                    gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.7,
                        opacityTo: 0.9,
                        stops: [0, 90, 100]
                    }
                },
                xaxis: {
                    categories: label
                }
            };

            var chart = new ApexCharts(document.querySelector("#chart2"), options);
            chart.render();
        }
    });
});

//ApexChart Salary
$(document).ready(function () {
    $.ajax({
        url: "https://localhost:44375/API/Employees/Salary",
        success: function (result) {
            //console.log(result);
            var label = [];
            var series = [];
            $.each(result.result, function (key, val) {
                series.push(val.value);
                label.push(val.salary);
            });
            var options = {
                series: [{
                    name: "Value",
                    data: series
                }],
                chart: {
                    type: 'bar',
                    height: 350
                },
                title: {
                    text: 'Salary',
                    align: 'Center'
                },
                plotOptions: {
                    bar: {
                        borderRadius: 4,
                        horizontal: true,
                    }
                },
                dataLabels: {
                    enabled: false
                },
                xaxis: {
                    name: "Salary",
                    categories: label
                }
            };
            var chart = new ApexCharts(document.querySelector("#chart3"), options);
            chart.render();
        }
    });
});
