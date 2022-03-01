

export default {
    props: ['txt'],
    template: `
        <section class="long-text">
            <p>{{displayTxt}} </p>
            <span class="read-more" v-if="isReadMore" @click="showLongText">read {{show}}...</span>
        </section>
    `,
    data() {
        return {
            isLongMode: false
        }
    },
    computed: {
        displayTxt() {
            if (!this.isLongMode && this.txt.length > 100) {
                console.log('big txt');
                return this.txt.slice(0, 30)
            } else {
                console.log('short txt');
                return this.txt
            }
        }, isReadMore() {
            return this.txt.length > 100 ? true : false
        }, show() {
            return !this.isLongMode ? 'more' : 'less'
        }

    }, methods: {
        showLongText() {
            this.isLongMode = !this.isLongMode;
        }
    }
}