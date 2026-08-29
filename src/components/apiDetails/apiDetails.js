import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronDown,
  FaAnglesRight,
  FaServer,
  FaLink,
  FaKey,
  FaShieldHalved,
  FaCode,
  FaFileCode,
  FaListCheck,
  FaCircleInfo,
  FaDiagramProject,
  FaMicrophoneLines,
  FaLockOpen,
} from "react-icons/fa6";
import "./apiDetails.css";

const DEFAULT_FLOW = [
  "User Input",
  "React",
  "API Request",
  "External API",
  "JSON Response",
  "Webverse UI",
];

const methodClass = (method = "") => {
  const m = method.toUpperCase();
  if (m.includes("POST")) return "method-post";
  if (m.includes("GET")) return "method-get";
  return "method-local";
};

const keyBadgeClass = (value = "") => {
  const v = value.toLowerCase();
  if (v.startsWith("not")) return "key-no";
  if (v.startsWith("required")) return "key-yes";
  return "key-maybe";
};

const ApiDetails = ({ meta, id }) => {
  const [open, setOpen] = useState(false);
  const uid = id || meta?.id || "tool";
  const buttonId = `api-details-toggle-${uid}`;
  const panelId = `api-details-panel-${uid}`;

  if (!meta) return null;

  const flow = Array.isArray(meta.flow) && meta.flow.length ? meta.flow : DEFAULT_FLOW;
  const steps = Array.isArray(meta.steps) ? meta.steps : [];
  const keyRequired = String(meta.apiKeyRequired || "");

  const rows = [];
  if (meta.provider)
    rows.push({
      key: "provider",
      icon: <FaServer aria-hidden="true" />,
      label: "API Provider",
      value: meta.provider,
    });
  if (meta.method)
    rows.push({
      key: "method",
      icon: <FaMicrophoneLines aria-hidden="true" />,
      label: "HTTP Method",
      value: <span className={`badge method-badge ${methodClass(meta.method)}`}>{meta.method}</span>,
    });
  if (meta.authentication)
    rows.push({
      key: "auth",
      icon:
        keyRequired.toLowerCase().startsWith("not") ? (
          <FaShieldHalved aria-hidden="true" />
        ) : (
          <FaKey aria-hidden="true" />
        ),
      label: "Authentication",
      value: meta.authentication,
    });
  if (meta.apiKeyRequired)
    rows.push({
      key: "key",
      icon:
        keyRequired.toLowerCase().startsWith("not") ? (
          <FaLockOpen aria-hidden="true" />
        ) : (
          <FaKey aria-hidden="true" />
        ),
      label: "API Key Required",
      value: <span className={`badge key-badge ${keyBadgeClass(keyRequired)}`}>{meta.apiKeyRequired}</span>,
    });
  if (meta.input)
    rows.push({
      key: "input",
      icon: <FaCode aria-hidden="true" />,
      label: "Input",
      value: meta.input,
    });
  if (meta.output)
    rows.push({
      key: "output",
      icon: <FaFileCode aria-hidden="true" />,
      label: "Output",
      value: meta.output,
    });
  if (meta.response)
    rows.push({
      key: "response",
      icon: <FaListCheck aria-hidden="true" />,
      label: "Response Format",
      value: meta.response,
    });
  if (meta.endpoint)
    rows.push({
      key: "endpoint",
      icon: <FaLink aria-hidden="true" />,
      label: "Endpoint",
      value: meta.endpoint,
    });
  if (meta.status)
    rows.push({
      key: "status",
      icon: <FaCircleInfo aria-hidden="true" />,
      label: "Status",
      value: meta.status,
    });

  return (
    <div className="api-details">
      <div className="api-details-inner">
        <button
          type="button"
          id={buttonId}
          className={`api-details-toggle${open ? " open" : ""}`}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="toggle-left">
            <FaDiagramProject aria-hidden="true" />
            <span>API Details</span>
          </span>
          <span className="toggle-right">
            {meta.provider && <span className="toggle-provider">{meta.provider}</span>}
            <FaChevronDown className="chevron" aria-hidden="true" />
          </span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className="api-details-panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {meta.purpose && <p className="api-purpose">{meta.purpose}</p>}

              <div className="api-kv-grid">
                {rows.map((row) => (
                  <div className="api-kv" key={row.key}>
                    <span className="kv-label">
                      {row.icon} {row.label}
                    </span>
                    <span className="kv-value">{row.value}</span>
                  </div>
                ))}
              </div>

              <div className="api-flow" aria-label="Request flow">
                {flow.map((step, i) => (
                  <span className="flow-group" key={`${step}-${i}`}>
                    <span className="flow-step">{step}</span>
                    {i < flow.length - 1 && (
                      <FaAnglesRight className="flow-arrow" aria-hidden="true" />
                    )}
                  </span>
                ))}
              </div>

              {steps.length > 0 && (
                <div className="api-steps">
                  <h4>How it works</h4>
                  <ol>
                    {steps.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ol>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ApiDetails;