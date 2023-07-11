import React, { useContext, createContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { EditionMetadataWithOwnerOutputSchema } from "@thirdweb-dev/sdk";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract("0xae6840C8Dde64c6Cee06bbE1d3AFa1aB9e412392");
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();
  const connect = useMetamask();

  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign({
        args: [
          address,
          form.title,
          form.description,
          form.target,
          new Date(form.deadline).getTime(),
          form.image,
        ],
      });
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const updateCampaign = async (form) => {
    try {
      const data = await contract.call("updateCampaign", [
        form.id,
        form.title,
        form.description,
        form.target,
        new Date(form.deadline).getTime(),
        ,
        form.image,
      ]);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const deleteCampaign = async (pId) => {
    try {
      const data = await contract.call("deleteCampaign", [pId]);
      console.log("contract call success", data);
      return data;
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getCampaigns = async () => {
    try {
      const campaigns = await contract.call("getCampaigns");

      const parsedCampaings = campaigns.map((campaign, i) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: campaign.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(
          campaign.amountCollected.toString()
        ),
        image: campaign.image,
        pId: i,
        payedOut: campaign.payedOut,
        numberOfDonators: campaign.numberOfDonators?.toString(),
      }));

      return parsedCampaings;
    } catch (err) {
      console.log(err);
    }
  };

  const getUserCampaigns = async () => {
    try {
      const allCampaigns = await getCampaigns();

      const filteredCampaigns = allCampaigns.filter(
        (campaign) => campaign.owner === address
      );

      return filteredCampaigns;
    } catch (err) {
      console.log(err);
    }
  };

  const donate = async (pId, amount) => {
    try {
      const data = await contract.call("donateToCampaign", [pId], {
        value: ethers.utils.parseEther(amount),
      });

      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const payOutToCampaignTeam = async (pId) => {
    try {
      const data = await contract.call("payOutToCampaignTeam", [pId]);
      return data;
    } catch (err) {
      console.log("Error occured while withdrawing funds", err);
    }
  };

  const getDonations = async (pId) => {
    try {
      const donations = await contract.call("getDonators", [pId]);
      const numberOfDonations = donations[0].length;

      const parsedDonations = [];

      for (let i = 0; i < numberOfDonations; i++) {
        parsedDonations.push({
          donator: donations[0][i],
          donation: ethers.utils.formatEther(donations[1][i].toString()),
        });
      }

      return parsedDonations;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        payOutToCampaignTeam,
        updateCampaign,
        deleteCampaign,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
