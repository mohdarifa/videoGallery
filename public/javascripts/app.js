
$(document).ready(function(e) {

    $(document).on('submit', '#video-upload-form', function(e) {
        e.preventDefault();
        var form = $(this);
        form.find('input[type="submit"]').attr('value', 'UPLOADING...').prop('disabled', true);
        var formData = new FormData(form[0]);
        $.ajax({
            url: '/api/upload',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
            	form.find('input[type="submit"]').attr('value', 'UPLOAD').prop('disabled', false);
            	$('#video-list').prepend(response);
            },
            complete: function() {
                form.find('input[type="submit"]').attr('value', 'UPLOAD').prop('disabled', false);
            }
        });
    });

});

/* Global Ajax Setup */
$.ajaxSetup({
    complete: function( jqXHR, settings ) {
        console.log(jqXHR);
    }
});