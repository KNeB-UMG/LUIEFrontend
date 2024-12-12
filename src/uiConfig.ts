export type UIViewProps = {
    link: string
    nav: 'sidebar' | 'navbar'
    laggs: boolean
    step?: string
}

export const uiConfigs: Record<string, UIViewProps> = {
    UI1: {
        link: 'blog',
        nav: 'sidebar',
        laggs: false
    },
    UI2: {
        link: 'blog',
        nav: 'navbar',
        laggs: false
    },
    UI3: {
        link: 'charts',
        nav: 'sidebar',
        laggs: false
    },
    UI4: {
        link: 'charts',
        nav: 'navbar',
        laggs: false
    },
    UI5: {
        link: 'dashboard',
        nav: 'sidebar',
        laggs: false
    },
    UI6: {
        link: 'dashboard',
        nav: 'navbar',
        laggs: false
    },
    UI7: {
        link: 'emoji',
        nav: 'sidebar',
        laggs: false
    },
    UI8: {
        link: 'emoji',
        nav: 'navbar',
        laggs: false
    },
    UI9: {
        link: 'projects',
        nav: 'sidebar',
        laggs: false
    },
    UI10: {
        link: 'projects',
        nav: 'navbar',
        laggs: false
    },
    UI11: {
        link: 'table',
        nav: 'sidebar',
        laggs: false
    },
    UI12: {
        link: 'table',
        nav: 'navbar',
        laggs: false
    },
    UI13: {
        link: 'todo',
        nav: 'sidebar',
        laggs: false
    },
    UI14: {
        link: 'todo',
        nav: 'navbar',
        laggs: false
    },

    LUI1: {
        link: 'blog',
        nav: 'sidebar',
        laggs: true
    },
    LUI2: {
        link: 'blog',
        nav: 'navbar',
        laggs: true
    },
    LUI3: {
        link: 'charts',
        nav: 'sidebar',
        laggs: true
    },
    LUI4: {
        link: 'charts',
        nav: 'navbar',
        laggs: true
    },
    LUI5: {
        link: 'dashboard',
        nav: 'sidebar',
        laggs: true
    },
    LUI6: {
        link: 'dashboard',
        nav: 'navbar',
        laggs: true
    },
    LUI7: {
        link: 'emoji',
        nav: 'sidebar',
        laggs: true
    },
    LUI8: {
        link: 'emoji',
        nav: 'navbar',
        laggs: true
    },
    LUI9: {
        link: 'projects',
        nav: 'sidebar',
        laggs: true
    },
    LUI10: {
        link: 'projects',
        nav: 'navbar',
        laggs: true
    },
    LUI11: {
        link: 'table',
        nav: 'sidebar',
        laggs: true
    },
    LUI12: {
        link: 'table',
        nav: 'navbar',
        laggs: true
    },
    LUI13: {
        link: 'todo',
        nav: 'sidebar',
        laggs: true
    },
    LUI14: {
        link: 'todo',
        nav: 'navbar',
        laggs: true
    },
};
