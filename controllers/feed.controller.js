
export const FeedController = (req, res) => {
    console.log(req.body)

    res.send({
        vercelprotocol: req.headers['x-forwarded-proto'],
        msg: "feed controller found"
    })
}