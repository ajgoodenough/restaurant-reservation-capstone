import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { listReservations } from "../utils/api";
import ReservationsList from "../Reservations/ReservationsList";
import "./Search.css";

const Search = () => {
  const [searchNumber, setSearchNumber] = useState("");
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const handleChange = (e) => {
    setSearchNumber(e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const abortController = new AbortController();
    setNoResults(false);
    try {
      const data = await listReservations(
        { mobile_number: searchNumber },
        abortController.signal
      );
      setReservations(data);
      setNoResults(true);
      setSearchNumber("");
    } catch (err) {
      setError(err);
    }

    return () => abortController.abort();
  }

  return (
    <div className="text-center" onSubmit={handleSubmit}>
      <div className="search-header">Search by Phone Number</div>
      <ErrorAlert error={error} />
      <form>
        <input
          type="text"
          name="mobile_number"
          value={searchNumber}
          onChange={handleChange}
          required
        />
        <button type="submit">
          <span className="oi oi-magnifying-glass"></span>
        </button>
      </form>
      {reservations.length > 0 && (
        <ReservationsList reservations={reservations} />
      )}
      {noResults && reservations.length === 0 ? (
        <h3>No reservations found</h3>
      ) : (
        ""
      )}
    </div>
  );
};

export default Search;
