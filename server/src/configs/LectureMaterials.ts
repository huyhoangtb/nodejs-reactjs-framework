export default class LectureMaterials {
    static VIDEO_ITEM = 1;
    static DOCUMENT_ITEM = 2;
    static TEXT_ITEM = 3;
    static EXERCISE_ITEM = 4;
    static SURVEY_ITEM = 5;
    static TEST_ITEM = 5;

    static VIDEO_HOSTED_ON_YOUTOBE = 1;
    static VIDEO_HOSTED_ON_VIMEO = 2;
    static VIDEO_HOSTED_ON_CND = 3;
    static types = {
        video: {
            value: LectureMaterials.VIDEO_ITEM,
            label: 'video'
        },
        document: {
            value: LectureMaterials.DOCUMENT_ITEM,
            label: 'document'
        },
        text: {
            value: LectureMaterials.TEXT_ITEM,
            label: 'text'
        },
        exercise: {
            value: LectureMaterials.EXERCISE_ITEM,
            label: 'exercise'
        },
        survey: {
            value: LectureMaterials.SURVEY_ITEM,
            label: 'survey'
        },
        test: {
            value: LectureMaterials.TEST_ITEM,
            label: 'test'
        }
    };
    static hostedTypes = {
        YOUTOBE: {
            value: LectureMaterials.VIDEO_HOSTED_ON_YOUTOBE,
            label: 'youtube'
        },
        VIMEO: {
            value: LectureMaterials.VIDEO_HOSTED_ON_VIMEO,
            label: 'vimeo'
        },
        localCDN: {
            value: LectureMaterials.VIDEO_HOSTED_ON_CND,
            label: 'upload to CDN'
        }
    }
}
