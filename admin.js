var admin2Records = $('#adminListing').DataTable({
    "lengthChange": false,
    "processing":true,
    "serverSide":true,        
    "bFilter": false,
    'serverMethod': 'post',        
    "order":[],
    "ajax":{
        url:"admin2_action.php",
        type:"POST",
        data:{action:'listAdmin2'},
        dataType:"json"
    },
    "columnDefs":[
        {
            "targets":[0, 6, 7, 8],
            "orderable":false,
        },
    ],
    "pageLength": 10
});    


