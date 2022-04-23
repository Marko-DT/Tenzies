import React from "react";

export default function Die({ id, dieClicked, isFreez, num }) {
  const styles = { backgroundColor: isFreez ? "#59E391" : "" };
  return (
    <div id={id} className="die" style={styles} onClick={() => dieClicked(id)}>
      {num}
    </div>
  );
}
