import express from "express";
import ffmpeg from "fluent-ffmpeg";

const app = express()
app.use(express.json());

// app.get("/", (req, res) => {
//     res.send("Hello World");
// });
app.post("/process-video", (req, res) => {
    const inputFilePath = req.body.inputFilePath;
    const outputFilePath = req.body.outputFilePath;

    if (!inputFilePath || !outputFilePath) {
        res.status(400).send("Bad Request: Missing file path.");
    }
    ffmpeg(inputFilePath).outputOptions("-vf", "scale=-1:360") // convert video to 360p
    .on("end", function() {
        console.log("Processing finished successfully");
        res.status(200).send("Video processing started.");
    })
    .on("error", (err) => {
        console.log(`An error occured: ${err.message}`);
        res.status(500).send(`Internal Server Error: ${err.message}`);
    })
    .save(outputFilePath);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`video processing service listening at http://localhost:${port}`);
})


