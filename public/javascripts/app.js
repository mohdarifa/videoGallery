
$(document).ready(function(e) {

    $(document).on('submit', '#video-upload-form', function(e) {
        e.preventDefault();
        var form = $(this);
        form.find('input[type="submit"]').attr('value', 'UPLOADING...').prop('disabled', true);
        var formData = new FormData(form[0]);
        $.ajax({
            url: form.attr('action'),
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                form.find('input[type="submit"]').attr('value', 'UPLOAD').prop('disabled', false);
                $('#no-videos').addClass('hide');
                $('#video-list').prepend(response);
                form[0].reset();
            },
            complete: function(response) {
                form.find('input[type="submit"]').attr('value', 'UPLOAD').prop('disabled', false);
            }
        });
    });

    $(document).on('click', '.delete-video', function(e) {
        e.preventDefault();
        var thisEle = $(this);
        thisEle.text('Deleting...');
        $.ajax({
            url: thisEle.attr('href'),
            type: 'DELETE',
            data: { videoId: thisEle.attr('data-id') },
            success: function(response) {
                thisEle.closest('.video-preview').remove();
                alert(response.message);
                if ( !$('.video-preview').length ) {
                    $('#no-videos').removeClass('hide');
                }
            },
            error: function(response) {
                thisEle.text('Delete');
                if ( response.responseText ) {
                    var res = JSON.parse(response.responseText);
                    alert(res.message);
                }
            }
        });
    });

    /*$(document).on('click', '.download-video', function(e) {
        e.preventDefault();
        var thisEle = $(this);
        $.ajax({
            url: thisEle.attr('href'),
            success: function(response) {
                alert(response.message);
            },
            error: function(response) {
                console.log(JSON.parse(response.responseText));
                alert(response.message);
            }
        });
    });*/

    $(document).on('click', '.preview', function(e) {
        var video = $('#video');
            source = $('#video source')[0];

        if ( source.src !== $(this).attr('video-src') ) {
            source.src = $(this).attr('video-src');
            source.type = $(this).attr('video-type');
            video[0].load();
        }
        $("#video-modal").modal('show');
    });

    $("#video-modal").on('shown.bs.modal', function(){
        $('#video')[0].play();
    });

    $("#video-modal").on('hide.bs.modal', function(){
        $('#video')[0].pause();
    });

});