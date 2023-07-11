import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import FundCard from "./FundCard";
import Loader from "./Loader";

const DisplayCampaigns = ({ title, q, setQ, isLoading, campaigns }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaignDetails/${campaign.title}`, { state: campaign });
  };

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
        {title} ({campaigns?.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && <Loader loadingTitle="Loading" />}

        {!isLoading && campaigns?.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campigns yet
          </p>
        )}

        {!isLoading &&
          campaigns?.length > 0 &&
          campaigns?.map((campaign) =>
            campaign.title
              .toLowerCase()
              .split(" ")
              .join("")
              .includes(q?.toLowerCase().split(" ").join("")) ? (
              <FundCard
                key={uuidv4()}
                campaign={campaign}
                handleClick={() => handleNavigate(campaign)}
              />
            ) : (
              <></>
            )
          )}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
