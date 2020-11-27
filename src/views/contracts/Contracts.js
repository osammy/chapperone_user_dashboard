import React, { useState } from "react";
import { Modal } from "antd";

import SearchOrg from "./components/SearchOrg/SearchOrg";
import CreateContractForm from "./components/CreateContractForm/Form";
import { getUrl, requests } from "../../globals/requests";
import { helpers } from "../../utils";

function Contracts() {
  const [organisation, setOrganisation] = useState({});
  const [orgCode, setOrgCode] = useState("");
  const [loadingOrgCode, setLoadingOrgCode] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const [searchBy, setSearchBy] = useState("Code");
  const [formValues, setFormValues] = useState({
    amount: "",
    description: "",
    contactEmail: "",
    startDate: "",
    endDate: "",
  });

  function handleChange(value) {
    setSearchBy(value);
  }

  function handleSearchInputChange(e) {
    setOrgCode(e.target.value);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });
  }

  function handleStartDateChange(date, dateString) {
    // const dateString = date.format("MMMM Do YYYY, h:mm:ss a");
    setFormValues({ ...formValues, startDate: dateString });
  }

  function handleEndDateChange(date, dateString) {
    // const dateString = date.format("MMMM Do YYYY, h:mm:ss a");
    setFormValues({ ...formValues, endDate: dateString });
  }

  async function wait(time) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time * 1000);
    });
  }
  async function getOrganisation() {
    try {
      const url = `${getUrl("organisations")}/query`;
      setLoadingOrgCode(true);
      await wait(1);
      const response = await requests.getWithAuth(url, { orgCode });
      setOrganisation(response.data);
      setLoadingOrgCode(false);
    } catch (e) {
      setLoadingOrgCode(false);
      helpers.displayMessage(e);
    }
  }

  function contractSuccess() {
    Modal.success({
      content: "Your contract was created and sent...",
    });
  }

  async function handleFormSubmit() {
    try {
      const url = `${getUrl("contracts")}`;
      setLoadingSubmit(true);
      const data = { ...formValues, organisation: organisation._id };
      const response = await requests.postWithAuth(url, data);
      setOrganisation(response.data);
      setLoadingSubmit(false);
      contractSuccess();
    } catch (e) {
      setLoadingSubmit(false);
      helpers.displayMessage(e);
    }
  }

  return (
    <div className="cnt-container">
      <SearchOrg
        searchBy={searchBy}
        handleChange={handleChange}
        handleSearch={getOrganisation}
        loading={loadingOrgCode}
        handleSearchInputChange={handleSearchInputChange}
        searchValue={orgCode}
      />

      {organisation._id && (
        <CreateContractForm
          handleInputChange={handleInputChange}
          organisation={organisation}
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
          handleSubmit={handleFormSubmit}
          loading={loadingSubmit}
        />
      )}
    </div>
  );
}

export default Contracts;
