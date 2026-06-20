import { useState } from "react";
import { InputField } from "../common/InputField";
import { Label } from "../common/Label";
import { UserIcon, MailIcon, LockIcon, CardIcon, EyeIcon, WarnIcon } from "../common/Icons";

export function Step1({ data, setData }) {
  const [showPass, setShowPass] = useState(false);
  
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label icon={<UserIcon />} text="First Name" />
          <InputField
            icon={<UserIcon />}
            placeholder="e.g. Dima"
            value={data.firstName}
            onChange={e => setData(d => ({ ...d, firstName: e.target.value }))}
          />
        </div>
        <div>
          <Label icon={<UserIcon />} text="Last Name" />
          <InputField
            icon={<UserIcon />}
            placeholder="e.g. Abed Alhady"
            value={data.lastName}
            onChange={e => setData(d => ({ ...d, lastName: e.target.value }))}
          />
        </div>
      </div>

      <div>
        <Label icon={<MailIcon />} text="Email Address" />
        <InputField
          icon={<MailIcon />}
          placeholder="name@example.com"
          type="email"
          value={data.email}
          onChange={e => setData(d => ({ ...d, email: e.target.value }))}
        />
      </div>

      <div>
        <Label icon={<LockIcon />} text="Password" />
        <InputField
          icon={<LockIcon />}
          placeholder="Minimum 8 characters"
          type={showPass ? "text" : "password"}
          value={data.password}
          onChange={e => setData(d => ({ ...d, password: e.target.value }))}
          rightIcon={<EyeIcon show={showPass} onClick={() => setShowPass(s => !s)} />}
        />
      </div>

      <div>
        <Label icon={<CardIcon />} text="ID Number" sub="(National ID)" />
        <InputField
          icon={<CardIcon />}
          placeholder="Enter your national ID number"
          value={data.nationalId}
          onChange={e => setData(d => ({ ...d, nationalId: e.target.value }))}
        />
      </div>

      <div className="flex gap-3 bg-orange-50 border border-orange-200 rounded-xl p-4">
        <WarnIcon />
        <p className="text-sm text-orange-700 font-['Inter']">
          <span className="font-bold">Important: </span>
          Your basic information (name, email, ID) cannot be changed later. Please double-check before proceeding.
        </p>
      </div>
    </div>
  );
}