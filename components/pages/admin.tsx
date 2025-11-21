import React, { useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import './App.css'; 

const API_BASE_URL = 'https://backend-nestingglobal.onrender.com';
const SOCKET_SERVER_URL = 'https://backend-nestingglobal.onrender.com';


const useSocket = (eventName, handler,https://backend-nestingglobal.onrender.com
) => {
    useEffect(() => {
        const socket = io(SOCKET_SERVER_URL, { transports: ['websocket'] });
        socket.on(eventName, handler);

        return () => {
            socket.off(eventName, handler);
            socket.disconnect();
        };
    }, [eventName, handler]);
};


function App() {
    const [properties, setProperties] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formStatus, setFormStatus] = useState(null);
    const [activeTab, setActiveTab] = useState('allProperties');
    const [stats, setStats] = useState({ total: 0, featured: 0 });

    const [formData, setFormData] = useState({
        title: '',
        location: '',
        price: '',
        type: 'Apartment',
        description: '',
        bedrooms: '',
        bathrooms: '',
        area: '',
        is_featured: 'no',
        images: [],
    });

    const fetchContacts = useCallback(async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/contact`);
            const data = await response.json();
            setContacts(data.data || []);
        } catch (err) {
            console.error("Error fetching contacts:", err);
        }
    }, []);


    const handleNewContact = useCallback((newContact) => {
        setContacts(prev => [newContact, ...prev]);
    }, []);
    useSocket("newContact", handleNewContact);


    const fetchProperties = useCallback(async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/properties`);
            const data = await response.json();

            setProperties(data.properties || []);
            const total = data.properties?.length || 0;
            const featured = data.properties?.filter(p => p.status === 'Featured').length || 0;

            setStats({ total, featured });
        } catch (err) {
            setError("Error fetching properties. Check Backend.");
        }
    }, []);

    
    useEffect(() => {
        Promise.all([fetchProperties(), fetchContacts()]).finally(() => setLoading(false));
    }, [fetchProperties, fetchContacts]);

    // SOCKET — UPDATE PROPERTY
    const handlePropertyUpdate = useCallback((updatedProperty) => {
        setProperties(prev => {
            const index = prev.findIndex(p => p._id === updatedProperty._id);
            let newProps = [...prev];

            if (index !== -1) newProps[index] = updatedProperty;
            else newProps.unshift(updatedProperty);

            const total = newProps.length;
            const featured = newProps.filter(p => p.status === 'Featured').length;

            setStats({ total, featured });
            return newProps;
        });
    }, []);

    useSocket("propertyUpdated", handlePropertyUpdate);
    useSocket("propertyAdded", handlePropertyUpdate);

    // ---------------- FORM CHANGE -------------------
    const handleFormChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === "file") {
            const selectedFiles = Array.from(files).slice(0, 5); // max 5 images
        setFormData(prev => ({ ...prev, images: selectedFiles }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    // ---------------- FORM SUBMIT -------------------
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setFormStatus("submitting");

        const data = new FormData();
        for (const key in formData) {
            if (key !== "images") data.append(key, formData[key]);
        }

        // Map radio → backend field
        data.set("status", formData.is_featured === "yes" ? "Featured" : "For Sale");

        formData.images.forEach(file => data.append("images", file));

        try {
            const response = await fetch(`${API_BASE_URL}/api/properties`, {
                method: "POST",
                body: data
            });

            const result = await response.json();

            if (!response.ok) throw new Error(result.message);

            setFormStatus("success");
            setTimeout(() => {
                setActiveTab("allProperties");
                setFormStatus(null);
            }, 1500);
        } catch (err) {
            setFormStatus("error");
            setError(err.message);
        }
    };

    // ---------------- DOWNLOADS -------------------
    const handleDownloadProperties = () => {
        window.open(`${API_BASE_URL}/api/download-excel`, "_blank");
    };

    const handleDownloadContacts = () => {
        window.open(`${API_BASE_URL}/api/download-contact-excel`, "_blank");
    };

    // ---------------- RENDER SIDEBAR -------------------
    const renderSidebar = () => (
        <div className="sidebar">
            <h3 className="sidebar-title">Main Navigation</h3>
            <ul className="sidebar-nav">
                <li className={activeTab === "allProperties" ? "active" : ""} onClick={() => setActiveTab("allProperties")}>
                    🏠 All Properties ({stats.total})
                </li>

                <li className={activeTab === "contactMessages" ? "active" : ""} onClick={() => setActiveTab("contactMessages")}>
                    📧 Contact Messages ({contacts.length})
                </li>

                <li className={activeTab === "addProperty" ? "active" : ""} onClick={() => setActiveTab("addProperty")}>
                    ➕ Add New Property
                </li>

                {activeTab === "contactMessages"
                    ? <li className="sidebar-download" onClick={handleDownloadContacts}>⬇ Download Contact List</li>
                    : <li className="sidebar-download" onClick={handleDownloadProperties}>⬇ Download Properties</li>
                }
            </ul>
        </div>
    );

    // ---------------- CONTACT TABLE -------------------
    const renderContactsTable = () => {
        const headers = ['ID', 'Full Name', 'Email', 'Phone', 'Message', 'Date'];
        return (
            <div className="table-container">
                <h2>📧 Contacts ({contacts.length})</h2>
                <table className="data-table">
                    <thead>
                        <tr>{headers.map(h => <th key={h}>{h}</th>)}</tr>
                    </thead>
                    <tbody>
                        {contacts.length > 0 ? contacts.map((c, i) => (
                            <tr key={c._id || i}>
                                <td>{c._id?.slice(0, 8)}</td>
                                <td>{c.FullName}</td>
                                <td>{c.Email}</td>
                                <td>{c.PhoneNumber}</td>
                                <td>{c.Message}</td>
                                <td>{c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "N/A"}</td>
                            </tr>
                        )) : <tr><td colSpan={6}>No contacts found.</td></tr>}
                    </tbody>
                </table>
            </div>
        );
    };

    // ---------------- PROPERTIES TABLE -------------------
    const renderPropertiesTable = () => {
        const headers = ['Title', 'Location', 'Type', 'Price', 'Beds', 'Baths', 'Status', 'Favs', 'Date'];

        return (
            <div className="table-container">
                <table className="data-table">
                    <thead>
                        <tr>{headers.map(h => <th key={h}>{h}</th>)}</tr>
                    </thead>
                    <tbody>
                        {properties.length > 0 ? properties.map(p => (
                            <tr key={p._id}>
                                <td>{p.title}</td>
                                <td>{p.location}</td>
                                <td>{p.type}</td>
                                <td>{Number(p.price).toLocaleString()}</td>
                                <td>{p.bedrooms || "-"}</td>
                                <td>{p.bathrooms || "-"}</td>
                                <td>{p.status}</td>
                                <td>{p.favorites?.length || 0}</td>
                                <td>{p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "N/A"}</td>
                            </tr>
                        )) : <tr><td colSpan={headers.length}>No properties found.</td></tr>}
                    </tbody>
                </table>
            </div>
        );
    };

    // ---------------- FORM TAB -------------------
    const renderNewPropertyForm = () => (
        <div className="property-form-container">
            {formStatus === 'success' && <div className="alert-success">Property added!</div>}
            {formStatus === 'error' && <div className="alert-error">{error}</div>}

            <form onSubmit={handleFormSubmit} className="property-form">
                <label>Title*</label>
                <input type="text" name="title" value={formData.title} onChange={handleFormChange} required />

                <label>Location*</label>
                <input type="text" name="location" value={formData.location} onChange={handleFormChange} required />

                <label>Price (₹)*</label>
                <input type="number" name="price" value={formData.price} onChange={handleFormChange} required />

                <label>Type*</label>
                <select name="type" value={formData.type} onChange={handleFormChange}>
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Studio">Studio</option>
                </select>

                <label>Bedrooms</label>
                <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleFormChange} />

                <label>Bathrooms</label>
                <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleFormChange} />

                <label>Area (sq ft)</label>
                <input type="number" name="area" value={formData.area} onChange={handleFormChange} />

                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleFormChange}></textarea>

                <label>Featured?</label>
                <div className="radio-group">
                    <label><input type="radio" name="is_featured" value="yes" checked={formData.is_featured === 'yes'} onChange={handleFormChange} /> Yes</label>
                    <label><input type="radio" name="is_featured" value="no" checked={formData.is_featured === 'no'} onChange={handleFormChange} /> No</label>
                </div>

                <label>Images*</label>
                <input type="file" name="images" multiple accept="image/*" onChange={handleFormChange} required max = {5}/>

                <button type="submit" disabled={formStatus === "submitting"}>
                    {formStatus === "submitting" ? "Saving..." : "Add Property"}
                </button>
            </form>
        </div>
    );

    // ---------------- CONTENT AREA -------------------
    const renderContentArea = () => {
        if (loading) return <div className="loading">Loading…</div>;
        if (error) return <div className="alert-error">{error}</div>;

        if (activeTab === "addProperty") return renderNewPropertyForm();
        if (activeTab === "contactMessages") return renderContactsTable();

        return (
            <div className="tab-content">
                <h2>🏠 Property Listings</h2>
                {renderPropertiesTable()}
            </div>
        );
    };

    return (
        <div className="admin-container">
            <div className="header"><h1>🏡 Property Admin Panel</h1></div>
            <div className="main-layout">
                {renderSidebar()}
                <div className="main-content-area">{renderContentArea()}</div>
            </div>
        </div>
    );
}

export default App;
