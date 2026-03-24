# @holokai/holo-types

Pure type definitions for the Holo platform. Zero runtime dependencies. Used by `@holokai/holo-sdk`, provider plugins, and the Holo application.

## Installation

```bash
npm install @holokai/holo-types
```

## Subpath Exports

Types are organized into subpath exports for tree-shaking and clear dependency boundaries:

| Subpath | Description | Key Types |
|---------|-------------|-----------|
| `@holokai/holo-types` | Root re-export of all types | Everything |
| `@holokai/holo-types/holo` | Holo universal format | `HoloRequest`, `HoloResponse`, `HoloMessage`, content types |
| `@holokai/holo-types/entities` | Database entities and enums | `ProviderRequest`, `ProviderResponse`, `ProtocolCapability`, pricing types |
| `@holokai/holo-types/worker` | Worker queue messages | `HoloWorkerRequest`, `WorkerResponseEnvelope`, `WorkerQueueMessage` |
| `@holokai/holo-types/notification` | Notification events | `NotificationEvent`, `NotificationStore` |
| `@holokai/holo-types/routing` | Route definitions and handlers | `RouteTree`, `RouteDefinition`, `RouteHandler` |
| `@holokai/holo-types/api` | API request/response shapes | API controller types |
| `@holokai/holo-types/provider` | Provider interfaces | `IProvider`, `IWireAdapter`, `IAuditor`, `IProviderTranslator`, `ProviderEvent` |
| `@holokai/holo-types/logger` | Logging contracts | `ILoggerFactory`, `ILogger`, `HoloLogLevel` |
| `@holokai/holo-types/plugin` | Plugin interfaces | `IProviderPlugin`, `PluginManifest`, `PluginContext`, `PluginState` |

## Usage

```typescript
// Import from specific subpaths
import type {HoloRequest, HoloResponse} from '@holokai/holo-types/holo';
import type {IProviderPlugin, PluginManifest} from '@holokai/holo-types/plugin';
import type {IProvider, ProviderEvent} from '@holokai/holo-types/provider';
import {ProtocolCapability} from '@holokai/holo-types/entities';
import {RouteHandler} from '@holokai/holo-types/routing';

// Or import everything from root
import type {HoloRequest, IProvider, PluginManifest} from '@holokai/holo-types';
```

## License

MIT
