import React, { useState } from "react";
import axios from "axios";
import "../App.css";

const CardBody = () => {
  const [text, setText] = useState("");
  const [ai, setAi] = useState(null);
  const [similarity, setSimilarity] = useState(null);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // -------------------------------------------
  // GENERATE TEACHER INSIGHTS
  // -------------------------------------------
  const generateTeacherInsights = (data, text) => {
    const aiScore = data.overall_ai_probability;

    // AI Category
    let category = "";
    if (aiScore < 40) category = "Likely Human-Written";
    else if (aiScore < 60) category = "Mixed (Human + AI)";
    else if (aiScore < 80) category = "Likely AI-Assisted";
    else category = "Strongly AI-Generated";

    // Suspicious Paragraphs (AI-like)
    let paragraphs = text.split("\n").filter(p => p.trim());
    let suspicious = paragraphs.filter(p => p.length > 120);

    return {
      category,
      suspicious,
      uniformStyle:
        aiScore > 65
          ? "Writing style is extremely uniform — often a sign of AI."
          : "Writing has natural variation — typical of human writing.",
      originality:
        aiScore > 60
          ? "Lacks personal voice or examples — may be AI-generated."
          : "Shows personal expression or contextual reasoning."
    };
  };

  // -------------------------------------------
  // RUN ANALYSIS
  // -------------------------------------------
  const runAnalysis = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError("");
    setAi(null);
    setSimilarity(null);
    setInsights(null);

    try {
      const res = await axios.post("http://127.0.0.1:5000/analyze", { text });
      const { ai_analysis, similarity_analysis } = res.data;

      setAi(ai_analysis);
      setSimilarity(similarity_analysis);
      setInsights(generateTeacherInsights(ai_analysis, text));
    } catch (e) {
      setError("Analysis failed.");
    }
    setLoading(false);
  };

  // -------------------------------------------
  // FILE UPLOAD
  // -------------------------------------------
  const uploadFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setText(res.data.extracted_text);
      setAi(res.data.ai_analysis);
      setSimilarity(res.data.similarity_analysis);
      setInsights(
        generateTeacherInsights(res.data.ai_analysis, res.data.extracted_text)
      );
    } catch (e) {
      setError("Upload failed.");
    }

    setLoading(false);
  };

  return (
    <section>
      <div className="popup">

        <textarea
          placeholder="Paste or type assignment text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input type="file" accept=".txt,.pdf,.docx" onChange={uploadFile} />

        <button className="submit" onClick={runAnalysis}>
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        {error && <p className="error-box">{error}</p>}

        {ai && (
          <div className="plan">

            <p className="title">{ai.result}</p>

            <p className="overall">
              AI Probability: <strong>{ai.overall_ai_probability}%</strong><br />
              Human Probability: {ai.overall_human_probability}%
            </p>

            <hr />

            {/* COLOR CODED SENTENCES */}
            <div className="sentence-block">
              {ai.sentence_scores.map((s, i) => (
                <p key={i} className={s.label === "AI" ? "ai-sentence" : "human-sentence"}>
                  {s.sentence}
                </p>
              ))}
            </div>

            <hr />

            {/* TEACHER INSIGHTS */}
            {insights && (
              <div style={{ textAlign: "left" }}>
                <h4>Teacher Insights</h4>

                <p><strong>Category:</strong> {insights.category}</p>
                <p><strong>Writing Style:</strong> {insights.uniformStyle}</p>
                <p><strong>Originality:</strong> {insights.originality}</p>

                {insights.suspicious.length > 0 && (
                  <>
                    <p><strong>Suspicious Paragraphs:</strong></p>
                    {insights.suspicious.map((p, index) => (
                      <p key={index} className="ai-sentence">{p}</p>
                    ))}
                  </>
                )}
              </div>
            )}

            {/* SIMILARITY CHECK */}
            {similarity && (
              <div style={{ textAlign: "left", marginTop: "15px" }}>
                <h4>Plagiarism & Similarity</h4>

                <p>
                  <strong>Average Similarity:</strong> {similarity.average_similarity}%<br />
                  <strong>Assessment:</strong> {similarity.label}
                </p>

                {similarity.matches.length > 0 ? (
                  similarity.matches.map((m, index) => (
                    <div key={index} className="ai-sentence">
                      <strong>Paragraph A:</strong> {m.para1}<br />
                      <strong>Paragraph B:</strong> {m.para2}<br />
                      <strong>Similarity:</strong> {m.score}%
                    </div>
                  ))
                ) : (
                  <p>No strong similarities found.</p>
                )}
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
};

export default CardBody;
