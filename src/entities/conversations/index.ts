export * from './model/conversations.store';
export * from './model/get-conversations.effect';

// добавляем вручную импорты (для регистрации сэмплов, связанными с ивентами сокетов),
// т.к. бандлер не включает эти файлы
// (потому что не импортируются никуда, а лишь регистрацию ивента на эффект производит)
import './model/update-conversations.effect';
import './model/update-participant-network-status.effect';
