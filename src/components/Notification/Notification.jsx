const Notification = ({ onExport, onReload, onDismiss }) => {
  return (
      <div
          style={{
              position: "fixed",
              bottom: 0,
              width: "100%",
              background: "#222",
              color: "white",
              textAlign: "center",
              padding: "10px",
              boxShadow: "0 -2px 5px rgba(0,0,0,0.3)",
              zIndex: 1000,
          }}
      >
          <p>A new version of the app is available. What would you like to do?</p>
          <button
              onClick={onExport}
              style={{
                  margin: "5px",
                  padding: "5px 10px",
                  background: "#007bff",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
              }}
          >
              Export Feeds
          </button>
          <button
              onClick={onReload}
              style={{
                  margin: "5px",
                  padding: "5px 10px",
                  background: "#28a745",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
              }}
          >
              Reload Now
          </button>
          <button
              onClick={onDismiss}
              style={{
                  margin: "5px",
                  padding: "5px 10px",
                  background: "#6c757d",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
              }}
          >
              Remind Me Later
          </button>
      </div>
  )
}

export default Notification