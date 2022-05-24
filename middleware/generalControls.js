
export default function (context) {
    if (process.client) {

        context.store.dispatch("initControls")

    } else {

        context.store.dispatch("initControls", context.req)

    }

}