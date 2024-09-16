from collections.abc import Callable
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.core.exceptions import ObjectDoesNotExist
from json.decoder import JSONDecodeError
import traceback


def error_handler_decorator(
    view: Callable[[HttpRequest, int], HttpResponse]
) -> Callable[[HttpRequest, int], HttpResponse]:
    def wrapper(request: HttpRequest, *args, **kwargs) -> HttpResponse:
        try:
            return view(request, *args, **kwargs)
        except ObjectDoesNotExist:
            return JsonResponse(
                {"error": f"Todo not found: {kwargs['id']}"}, status=404
            )
        except KeyError as e:
            return JsonResponse(
                {"error": f"Mandatory field {e.args[0]} not found"}, status=400
            )
        except JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
        except:
            traceback.print_exc()
            return JsonResponse({"error": "Internal server error"}, status=500)

    return wrapper
