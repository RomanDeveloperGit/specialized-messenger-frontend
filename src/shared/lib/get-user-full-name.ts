export const getUserFullName = ({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) => {
  if (!firstName || !lastName) {
    return '';
  }

  return `${firstName} ${lastName}`;
};
