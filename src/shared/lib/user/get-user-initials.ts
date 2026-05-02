export const getUserInitials = ({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) => {
  if (!firstName || !lastName) {
    return '';
  }

  return `${firstName.charAt(0)}${lastName.charAt(0)}`;
};
