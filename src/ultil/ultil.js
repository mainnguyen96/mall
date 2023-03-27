import { async } from "@firebase/util";
import { getData } from "~/firebaseServices";
import { useSelector } from "react-redux";
import { selectShippingLocations } from "~/features/shippingSlice";

export const getLocationForUser = async (userId) => {
  const locationId = await getData(
    "users/" + userId + "/" + "shippingLocation"
  );
  const location = await getData(
    "users/" + userId + "/" + "locations" + "/" + locationId
  );
  const provinceData = await getData(
    "shippingPrice/vietnam/" + location.province
  );
  const province = provinceData.label;
  const districtData = provinceData.districts[location.district];
  const district = districtData.label;
  const wardData = districtData.wards[location.ward];
  const ward = wardData.label;
  const locationData = {
    id: locationId,
    label: `${ward}, ${district}, ${province}`,
  };
  return locationData;
};

export const getShippingInfo = async (userId, locationId, shippingMethodId) => {
  console.log("locationId:", locationId);
  const location = await getData(
    "users/" + userId + "/" + "locations" + "/" + locationId
  );
  const provinceData = await getData(
    "shippingPrice/vietnam/" + location.province
  );
  const province = provinceData.label;
  const districtData = provinceData.districts[location.district];
  const district = districtData.label;
  const wardData = districtData.wards[location.ward];
  const ward = wardData.label;
  const locationData = `${ward}, ${district}, ${province}`;
  const fee = wardData.price[shippingMethodId];

  return {
    location: locationData,
    fee: fee,
  };
};

export const convertCurrency = (number) => {
  const currency = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
  return currency;
};

export const timeCompare = (a, b) => {
  return Date.parse(b) - Date.parse(a);
};

export const convertStringToDateFormat = (string) => {
  const date = new Date(string).toDateString();
  const day = date.split(" ");
  switch (day[0]) {
    case "Mon": {
      day[0] = "Monday";
      break;
    }
    case "Tue": {
      day[0] = "Tuesday";
      break;
    }
    case "Wed": {
      day[0] = "Wednesday";
      break;
    }
    case "Thu": {
      day[0] = "Thursday";
      break;
    }
    case "Fri": {
      day[0] = "Friday";
      break;
    }
    case "Sat": {
      day[0] = "Saturday";
      break;
    }
    case "Sun": {
      day[0] = "Sunday";
      break;
    }

    default:
      return;
  }
  return day.join(" ");
};

export const getDistrictsFromProvince = (locations, provinceId) => {
  const districtsData = [];
  const [data] = locations.filter((province) => province.id == provinceId);
  for (let key in data.districts) {
    districtsData.push({
      id: key,
      label: data.districts[key].label,
      wards: data.districts[key].wards,
    });
  }
  return [{ label: "select district", id: "select distric" }, ...districtsData];
};

export const getWardsFromDistrict = (districts, districtId) => {
  const wardsData = [];
  const [data] = districts.filter((district) => district.id == districtId);
  for (let key in data.wards) {
    wardsData.push({
      id: key,
      label: data.wards[key].label,
    });
  }
  return [{ label: "select ward", id: "select ward" }, ...wardsData];
};
