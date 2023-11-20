import moment from 'moment'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.mixin({
        methods: {
            moneyFormat(x: number): string {
                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' ₸'
            },
            FormatDay(date: string | Date): string {
                moment.locale('ru')
                return moment(date).format('DD.MM.YYYY')
            }
        }
    })
})
