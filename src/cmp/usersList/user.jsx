import React from "react";
import { Link } from "react-router-dom";

const User = ({ username, id }) => {
  return (
    <tr>
      <td><Link style={{textDecoration: 'none'}} to={`/user/${id}`}>{username}</Link></td>
    </tr>
  );
};
export default User;
