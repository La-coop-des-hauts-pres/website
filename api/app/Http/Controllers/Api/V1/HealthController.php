<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\V1;

use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Database\DatabaseManager;
use Illuminate\Http\JsonResponse;
use Throwable;

final readonly class HealthController
{
    public function __construct(private DatabaseManager $databaseManager, private ResponseFactory $responseFactory) {}

    public function __invoke(): JsonResponse
    {
        try {
            $this->databaseManager->connection()->getPdo();
            $isDatabaseReachable = true;
        } catch (Throwable) {
            $isDatabaseReachable = false;
        }

        return $this->responseFactory->json(
            ['status' => $isDatabaseReachable ? 'ok' : 'degraded', 'database' => $isDatabaseReachable],
            $isDatabaseReachable ? 200 : 503,
        );
    }
}
