import type { Dto } from '@specialized-messenger/api/specs';

export const createInvitationLink = (invitation: Dto['Invitation']) => {
  return `${globalThis.location.origin}/invitation/${invitation.publicId}?firstName=${invitation.firstName}&lastName=${invitation.lastName}`;
};
