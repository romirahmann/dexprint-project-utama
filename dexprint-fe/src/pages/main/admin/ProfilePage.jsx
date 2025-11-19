/* eslint-disable no-unused-vars */
import { useEffect, useState, useCallback } from "react";
import {
  FiGlobe,
  FiMail,
  FiPhone,
  FiUsers,
  FiCalendar,
  FiMapPin,
  FiTarget,
  FiFlag,
} from "react-icons/fi";
import api from "../../../services/axios.service";
import { useAlert } from "../../../store/AlertContext";
import { EditableField } from "../../../components/admin/profile/EditableField";
import { SectionBlock } from "../../../components/admin/profile/SectionBlock";

export function ProfileInfoPage() {
  const { showAlert } = useAlert();
  const [editField, setEditField] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const [field, setField] = useState({
    companyName: "",
    phone: "",
    email: "",
    established: "",
    websiteName: "",
    employees: 0,
    address: "",
    description: "",
    vision: "",
    mission: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        let res = await api.get("/master/profile");
        setField(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, []);

  const handleEdit = useCallback((name) => setEditField(name), []);
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setField((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    try {
      await api.put(`/master/profile/${field.profileId}`, field);
      showAlert("success", "Update Profile successfully!");
      setEditField(null);
    } catch (error) {
      showAlert("error", "Update Profile Failed!");
    } finally {
      setIsSaving(false);
    }
  }, [field, showAlert]);

  const handleCancel = useCallback(() => {
    setField((prev) => ({ ...prev, ...field }));
    setEditField(null);
  }, [field]);

  return (
    <div className="w-full bg-gradient-to-br from-orange-50 to-gray-50 px-6 py-5">
      <div className="max-w-full mx-auto mb-10 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-800">Company Profile</h1>
        <p className="text-gray-500 text-sm">
          Manage your company information easily and efficiently
        </p>
      </div>

      {/* Grid Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <EditableField
          label="Company Name"
          name="companyName"
          icon={<FiGlobe className="text-orange-500" />}
          value={field.companyName}
          editField={editField}
          onEdit={handleEdit}
          onChange={onChange}
          onSave={handleSave}
          onCancel={handleCancel}
          isSaving={isSaving}
        />

        <EditableField
          label="Email"
          name="email"
          icon={<FiMail className="text-orange-500" />}
          value={field.email}
          type="email"
          editField={editField}
          onEdit={handleEdit}
          onChange={onChange}
          onSave={handleSave}
          onCancel={handleCancel}
          isSaving={isSaving}
        />

        <EditableField
          label="Phone"
          name="phone"
          icon={<FiPhone className="text-orange-500" />}
          value={field.phone}
          editField={editField}
          onEdit={handleEdit}
          onChange={onChange}
          onSave={handleSave}
          onCancel={handleCancel}
          isSaving={isSaving}
        />

        <EditableField
          label="Website"
          name="websiteName"
          icon={<FiGlobe className="text-orange-500" />}
          value={field.websiteName}
          editField={editField}
          onEdit={handleEdit}
          onChange={onChange}
          onSave={handleSave}
          onCancel={handleCancel}
          isSaving={isSaving}
        />

        <EditableField
          label="Established"
          name="established"
          icon={<FiCalendar className="text-orange-500" />}
          value={field.established}
          type="month"
          editField={editField}
          onEdit={handleEdit}
          onChange={onChange}
          onSave={handleSave}
          onCancel={handleCancel}
          isSaving={isSaving}
        />

        <EditableField
          label="Employees"
          name="employees"
          icon={<FiUsers className="text-orange-500" />}
          value={field.employees}
          type="number"
          editField={editField}
          onEdit={handleEdit}
          onChange={onChange}
          onSave={handleSave}
          onCancel={handleCancel}
          isSaving={isSaving}
        />
      </div>

      {/* Address */}
      <div className="mt-5">
        <EditableField
          label="Address"
          name="address"
          icon={<FiMapPin className="text-orange-500" />}
          value={field.address}
          editField={editField}
          onEdit={handleEdit}
          onChange={onChange}
          onSave={handleSave}
          onCancel={handleCancel}
          isSaving={isSaving}
        />
      </div>

      {/* Description, Vision & Mission */}
      {["description", "vision", "mission"].map((section) => (
        <SectionBlock
          key={section}
          title={section}
          icon={
            section === "vision" ? (
              <FiTarget className="text-orange-500" />
            ) : section === "mission" ? (
              <FiFlag className="text-orange-500" />
            ) : null
          }
          isEditing={editField === section}
          value={field[section]}
          onChange={onChange}
          onEdit={() => handleEdit(section)}
          onCancel={handleCancel}
          onSave={handleSave}
          isSaving={isSaving}
        />
      ))}
    </div>
  );
}
