import "../styles/Pages.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const { logout } = useContext(AuthContext);
  const nav = useNavigate();

  const [perfumes, setPerfumes] = useState([]);
  const [msg, setMsg] = useState("");

  const [form, setForm] = useState({
    name: "",
    brand: "",
    gender: "women",
    description: "",
    price: "",
  });

  const [image, setImage] = useState(null);
  const [editing, setEditing] = useState(null); 

  const adminHeaders = { headers: { "x-admin": "1" } };

  const load = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/perfumes", adminHeaders);
      setPerfumes(res.data || []);
    } catch (err) {
      setMsg(err?.response?.data?.error || "❌ Cannot load perfumes");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const addPerfume = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (image) fd.append("image", image);

      await axios.post("http://localhost:5000/admin/perfumes", fd, {
        headers: { "x-admin": "1", "Content-Type": "multipart/form-data" },
      });

      setMsg("✅ Perfume added");
      setForm({ name: "", brand: "", gender: "women", description: "", price: "" });
      setImage(null);
      load();
    } catch (err) {
      setMsg(err?.response?.data?.error || "❌ Add error");
    }
  };

  const deletePerfume = async (id) => {
    if (!window.confirm("Delete this perfume?")) return;
    setMsg("");

    try {
      await axios.delete(`http://localhost:5000/admin/perfumes/${id}`, adminHeaders);
      setMsg("✅ Deleted");
      load();
    } catch (err) {
      setMsg(err?.response?.data?.error || "❌ Delete error");
    }
  };

  const saveEdit = async () => {
    setMsg("");
    try {
      await axios.put(
        `http://localhost:5000/admin/perfumes/${editing.id}`,
        {
          name: editing.name,
          brand: editing.brand,
          gender: editing.gender,
          description: editing.description,
          price: editing.price,
        },
        adminHeaders
      );
      setMsg("✅ Updated");
      setEditing(null);
      load();
    } catch (err) {
      setMsg(err?.response?.data?.error || "❌ Update error");
    }
  };

  const changeImage = async (id, file) => {
    setMsg("");
    try {
      const fd = new FormData();
      fd.append("image", file);

      await axios.put(`http://localhost:5000/admin/perfumes/${id}/image`, fd, {
        headers: { "x-admin": "1", "Content-Type": "multipart/form-data" },
      });

      setMsg("✅ Image updated");
      load();
    } catch (err) {
      setMsg(err?.response?.data?.error || "❌ Image upload error");
    }
  };

  const logoutAdmin = () => {
    logout();
    nav("/admin/login");
  };

  return (
    <div className="page-wrapper container">
      <h2 className="page-title">Admin Dashboard</h2>
      <p className="page-subtitle">Add, edit, delete perfumes and upload images.</p>

      <div className="d-flex justify-content-end gap-2 mb-3">
        <button className="btn btn-outline-secondary" onClick={() => nav("/")}>
          Client Site
        </button>
        <button className="btn auth-btn" onClick={logoutAdmin}>
          Logout
        </button>
      </div>

      {msg && <div className="alert alert-light">{msg}</div>}

      <div className="card p-3 mb-4 shadow-sm border-0">
        <h5 className="auth-welcome mb-3">Add New Perfume</h5>

        <form onSubmit={addPerfume} className="row g-3">
          <div className="col-md-6">
            <input
              className="form-control auth-input"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="col-md-6">
            <input
              className="form-control auth-input"
              placeholder="Brand"
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
            />
          </div>

          <div className="col-md-3">
            <select
              className="form-control auth-input"
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
            >
              <option value="women">Women</option>
              <option value="men">Men</option>
            </select>
          </div>

          <div className="col-md-3">
            <input
              className="form-control auth-input"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </div>

          <div className="col-md-6">
            <input
              className="form-control auth-input"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
          </div>

          <div className="col-12">
            <textarea
              className="form-control auth-input"
              rows="3"
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="col-12">
            <button className="btn btn-gold" type="submit">
              Add Perfume
            </button>
          </div>
        </form>
      </div>

      <div className="card p-3 shadow-sm border-0">
        <h5 className="auth-welcome mb-3">Perfumes List</h5>

        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Brand</th>
                <th>Gender</th>
                <th>Price</th>
                <th style={{ width: 220 }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {perfumes.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>

                  <td>
                    {p.image ? (
                      <img
                        src={`http://localhost:5000/images/${p.image}`}
                        alt={p.name}
                        style={{ width: 55, height: 55, objectFit: "cover", borderRadius: 8 }}
                      />
                    ) : (
                      <span className="text-muted">No image</span>
                    )}

                    <input
                      className="form-control auth-input mt-2"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) changeImage(p.id, f);
                      }}
                    />
                  </td>

                  <td>{p.name}</td>
                  <td>{p.brand}</td>
                  <td>{p.gender}</td>
                  <td>${Number(p.price).toFixed(2)}</td>

                  <td className="d-flex gap-2">
                    <button className="btn btn-outline-secondary" onClick={() => setEditing({ ...p })}>
                      Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => deletePerfume(p.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {perfumes.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center text-muted">
                    No perfumes yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            zIndex: 9999,
          }}
        >
          <div className="card p-4" style={{ width: 520, maxWidth: "95%" }}>
            <h5 className="auth-welcome mb-3">Edit Perfume #{editing.id}</h5>

            <input
              className="form-control auth-input mb-2"
              value={editing.name}
              onChange={(e) => setEditing({ ...editing, name: e.target.value })}
            />
            <input
              className="form-control auth-input mb-2"
              value={editing.brand}
              onChange={(e) => setEditing({ ...editing, brand: e.target.value })}
            />
            <select
              className="form-control auth-input mb-2"
              value={editing.gender}
              onChange={(e) => setEditing({ ...editing, gender: e.target.value })}
            >
              <option value="women">women</option>
              <option value="men">men</option>
            </select>
            <input
              className="form-control auth-input mb-2"
              value={editing.price}
              onChange={(e) => setEditing({ ...editing, price: e.target.value })}
            />
            <textarea
              className="form-control auth-input mb-3"
              rows="3"
              value={editing.description}
              onChange={(e) => setEditing({ ...editing, description: e.target.value })}
            />

            <div className="d-flex justify-content-end gap-2">
              <button className="btn btn-outline-secondary" onClick={() => setEditing(null)}>
                Cancel
              </button>
              <button className="btn btn-gold" onClick={saveEdit}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
