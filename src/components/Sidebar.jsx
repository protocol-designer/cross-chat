import React from "react";

const data = [
  { name: "Robert", address: "address1" },
  { name: "Xavier", address: "address2" },
  { name: "Xavier", address: "address2" },
  { name: "Xavier", address: "address2" },
  { name: "Xavier", address: "address2" },
];

const colors = [
  "#8AC4FF",
  "#9AFF8A",
  "#F8FFCA",
  "#FF8585",
  "#FFBA87",
  "#C3F9E5",
  "#87B0FF",
  "#B7A5FF",
  "#F094FF",
  "#FFB4E1",
];
const Sidebar = () => {
  return (
    <div className="w-96 bg-white">
      <div className="container flex flex-col items-center py-5 gap-2">
        <div className="channel">
          <a
            href="#my-modal-2"
            className="btn btn-primary w-72 h-16 text-[1.3rem] capitalize mb-5"
          >
            Create Channel
          </a>
        </div>
        <button>Refresh</button>
        {/* {data
          ? data.map(({ name, address }) => {
              return (
                <div className="contact border w-[96%] h-16 rounded-xl flex items-center gap-3 pl-3 cursor-pointer hover:bg-[#FAFAFA]">
                  <div
                    className="profile h-12 w-12 rounded-[50%]"
                    style={{
                      backgroundColor:
                        colors[Math.floor(Math.random() * colors.length)],
                    }}
                  ></div>
                  <div className="name font-bold text-[1.1rem]">{name}</div>
                </div>
              );
            })
          : ""} */}
        <div>
          <button>Refresh</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
