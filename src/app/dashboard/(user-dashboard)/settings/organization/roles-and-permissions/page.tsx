"use client";

import { useState } from "react";

import CustomButton from "~/components/common/common-button/common-button";
import RoleCreationModal from "~/components/common/modals/role-creation";

type Role = {
  id: number;
  name: string;
  description: string;
};

type Permission = {
  name: string;
  enabled: boolean;
};

const rolesData: Role[] = [
  { id: 1, name: "Guest", description: "Read-only access" },
  { id: 2, name: "User", description: "Read, write, update" },
  { id: 3, name: "Manager", description: "Read, write, approve" },
  { id: 4, name: "Project Lead", description: "Manage, coordinate, oversee" },
  { id: 5, name: "Administrator", description: "Full access, control" },
];

const permissionsData: { [key: number]: Permission[] } = {
  1: [
    { name: "Can view transactions", enabled: true },
    { name: "Can view refunds", enabled: false },
    { name: "Can log refunds", enabled: true },
  ],
  2: [
    { name: "Can view users", enabled: true },
    { name: "Can create users", enabled: false },
    { name: "Can edit users", enabled: true },
    { name: "Can blacklist/whitelist users", enabled: true },
  ],
  3: [
    { name: "Can view users", enabled: true },
    { name: "Can create users", enabled: true },
    { name: "Can edit users", enabled: false },
    { name: "Can blacklist/whitelist users", enabled: true },
  ],
  4: [
    { name: "Can view transactions", enabled: true },
    { name: "Can view refunds", enabled: true },
    { name: "Can log refunds", enabled: true },
    { name: "Can view users", enabled: true },
    { name: "Can create users", enabled: true },
    { name: "Can edit users", enabled: true },
    { name: "Can blacklist/whitelist users", enabled: true },
  ],
  5: [
    { name: "Can view transactions", enabled: true },
    { name: "Can view refunds", enabled: true },
    { name: "Can log refunds", enabled: true },
    { name: "Can view users", enabled: true },
    { name: "Can create users", enabled: true },
    { name: "Can edit users", enabled: true },
    { name: "Can blacklist/whitelist users", enabled: true },
  ],
};

const RolesAndPermission = () => {
  const [selectedRoleId, setSelectedRoleId] = useState<number | undefined>();
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRoleClick = (roleId: number) => {
    setSelectedRoleId(roleId);
    setPermissions([...permissionsData[roleId]]);
  };

  const handleToggle = (index: number) => {
    setPermissions((previous) => {
      const newPermissions = [...previous];
      newPermissions[index].enabled = !newPermissions[index].enabled;
      permissionsData[selectedRoleId!] = newPermissions;
      return newPermissions;
    });
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="flex">
        <div className="w-1/4 pr-6">
          <h2 className="mb-10 text-xl font-medium">Roles</h2>
          <ul>
            {rolesData.map((role) => (
              <li
                key={role.id}
                className={`mb-6 cursor-pointer border-b border-[#CBD5E1] p-2 ${
                  selectedRoleId === role.id
                    ? "rounded-md bg-orange-500 text-white"
                    : "bg-white text-[#0a0a0a] hover:bg-[#F1F5F9]"
                }`}
                onClick={() => handleRoleClick(role.id)}
              >
                <div className="text-base font-medium">{role.name}</div>
                <div
                  className={`text-xs font-normal ${selectedRoleId === role.id ? "text-white" : "text-[#525252]"}`}
                >
                  {role.description}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-3/4">
          <div className="flex justify-end">
            <CustomButton
              variant="primary"
              className="mb-6"
              onClick={handleModalOpen}
            >
              + Create roles
            </CustomButton>
          </div>
          <div className="border-l border-[#CBD5E1] pl-6">
            <div className="border-b border-[#CBD5E1] pb-4">
              <h2 className="mb-2 text-xl font-semibold text-[#0A0A0A]">
                Permissions
              </h2>
              <p className="text-xs font-normal text-[#525252]">
                See the list of permissions for this role
              </p>
            </div>
            {selectedRoleId === undefined ? (
              <div className="item-center flex flex-col justify-center py-56">
                <p className="text-center text-sm font-normal text-[#525252]">
                  No list to show
                </p>
                <p className="text-center text-sm font-normal text-[#525252]">
                  Click on a role to view permissions
                </p>
              </div>
            ) : (
              <div className="mt-6">
                <h3 className="mb-4 font-[#0a0a0a] text-base font-medium">
                  Transactions Permission
                </h3>
                {permissions.map((permission, index) => (
                  <div
                    key={permission.name}
                    className="mb-6 flex items-center justify-between"
                  >
                    <span className="text-sm font-normal text-[#525252]">
                      {permission.name}
                    </span>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={permission.enabled}
                        onChange={() => handleToggle(index)}
                      />
                      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-orange-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-orange-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-orange-800"></div>
                    </label>
                  </div>
                ))}
                <div className="mt-16 flex justify-end">
                  <button className="rounded border border-[#E2E8F0] bg-[#F1F5F9] px-4 py-2 text-sm font-medium text-[#0F172A] hover:bg-[#c1c9d2]">
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <RoleCreationModal show={isModalOpen} onClose={handleModalClose} />
    </div>
  );
};

export default RolesAndPermission;
