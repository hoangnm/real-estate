import angular from 'angular';

export default function UtilsService(Upload) {
    'ngInject';

    return {
        uploadFile: uploadFile
    };

    function uploadFile(file, uploadUrl) {
        var upload = Upload.upload({
            url: uploadUrl,
            data: { file: file }
        });

        return upload;
    }
}