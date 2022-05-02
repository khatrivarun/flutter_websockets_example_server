export class SendMessageDto {
  public authenticated: boolean;
  public message: string;
}

export const validateSendMessageDto = (
  sendMessageDto: SendMessageDto,
): string[] => {
  const errors: string[] = [];

  if (!sendMessageDto.authenticated) {
    errors.push('UNAUTHENTICATED');
  }

  if (!sendMessageDto.message) {
    errors.push('NO MESSAGE');
  }

  return errors;
};
